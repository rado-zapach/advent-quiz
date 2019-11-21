package sk.rzapach.advent.web.rest;

import sk.rzapach.advent.AdventQuizApp;
import sk.rzapach.advent.domain.Question;
import sk.rzapach.advent.domain.Answer;
import sk.rzapach.advent.repository.QuestionRepository;
import sk.rzapach.advent.service.QuestionService;
import sk.rzapach.advent.web.rest.errors.ExceptionTranslator;
import sk.rzapach.advent.service.dto.QuestionCriteria;
import sk.rzapach.advent.service.QuestionQueryService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static sk.rzapach.advent.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link QuestionResource} REST controller.
 */
@SpringBootTest(classes = AdventQuizApp.class)
public class QuestionResourceIT {

    private static final String DEFAULT_TEXT = "AAAAAAAAAA";
    private static final String UPDATED_TEXT = "BBBBBBBBBB";

    private static final String DEFAULT_CHOICES = "AAAAAAAAAA";
    private static final String UPDATED_CHOICES = "BBBBBBBBBB";

    private static final String DEFAULT_ICON = "AAAAAAAAAA";
    private static final String UPDATED_ICON = "BBBBBBBBBB";

    private static final String DEFAULT_ANSWER = "AAAAAAAAAA";
    private static final String UPDATED_ANSWER = "BBBBBBBBBB";

    private static final Instant DEFAULT_TIME = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_TIME = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private QuestionService questionService;

    @Autowired
    private QuestionQueryService questionQueryService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restQuestionMockMvc;

    private Question question;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final QuestionResource questionResource = new QuestionResource(questionService, questionQueryService);
        this.restQuestionMockMvc = MockMvcBuilders.standaloneSetup(questionResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Question createEntity(EntityManager em) {
        Question question = new Question()
            .text(DEFAULT_TEXT)
            .choices(DEFAULT_CHOICES)
            .icon(DEFAULT_ICON)
            .answer(DEFAULT_ANSWER)
            .time(DEFAULT_TIME);
        return question;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Question createUpdatedEntity(EntityManager em) {
        Question question = new Question()
            .text(UPDATED_TEXT)
            .choices(UPDATED_CHOICES)
            .icon(UPDATED_ICON)
            .answer(UPDATED_ANSWER)
            .time(UPDATED_TIME);
        return question;
    }

    @BeforeEach
    public void initTest() {
        question = createEntity(em);
    }

    @Test
    @Transactional
    public void createQuestion() throws Exception {
        int databaseSizeBeforeCreate = questionRepository.findAll().size();

        // Create the Question
        restQuestionMockMvc.perform(post("/api/questions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(question)))
            .andExpect(status().isCreated());

        // Validate the Question in the database
        List<Question> questionList = questionRepository.findAll();
        assertThat(questionList).hasSize(databaseSizeBeforeCreate + 1);
        Question testQuestion = questionList.get(questionList.size() - 1);
        assertThat(testQuestion.getText()).isEqualTo(DEFAULT_TEXT);
        assertThat(testQuestion.getChoices()).isEqualTo(DEFAULT_CHOICES);
        assertThat(testQuestion.getIcon()).isEqualTo(DEFAULT_ICON);
        assertThat(testQuestion.getAnswer()).isEqualTo(DEFAULT_ANSWER);
        assertThat(testQuestion.getTime()).isEqualTo(DEFAULT_TIME);
    }

    @Test
    @Transactional
    public void createQuestionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = questionRepository.findAll().size();

        // Create the Question with an existing ID
        question.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restQuestionMockMvc.perform(post("/api/questions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(question)))
            .andExpect(status().isBadRequest());

        // Validate the Question in the database
        List<Question> questionList = questionRepository.findAll();
        assertThat(questionList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkTimeIsRequired() throws Exception {
        int databaseSizeBeforeTest = questionRepository.findAll().size();
        // set the field null
        question.setTime(null);

        // Create the Question, which fails.

        restQuestionMockMvc.perform(post("/api/questions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(question)))
            .andExpect(status().isBadRequest());

        List<Question> questionList = questionRepository.findAll();
        assertThat(questionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllQuestions() throws Exception {
        // Initialize the database
        questionRepository.saveAndFlush(question);

        // Get all the questionList
        restQuestionMockMvc.perform(get("/api/questions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(question.getId().intValue())))
            .andExpect(jsonPath("$.[*].text").value(hasItem(DEFAULT_TEXT)))
            .andExpect(jsonPath("$.[*].choices").value(hasItem(DEFAULT_CHOICES)))
            .andExpect(jsonPath("$.[*].icon").value(hasItem(DEFAULT_ICON)))
            .andExpect(jsonPath("$.[*].answer").value(hasItem(DEFAULT_ANSWER)))
            .andExpect(jsonPath("$.[*].time").value(hasItem(DEFAULT_TIME.toString())));
    }
    
    @Test
    @Transactional
    public void getQuestion() throws Exception {
        // Initialize the database
        questionRepository.saveAndFlush(question);

        // Get the question
        restQuestionMockMvc.perform(get("/api/questions/{id}", question.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(question.getId().intValue()))
            .andExpect(jsonPath("$.text").value(DEFAULT_TEXT))
            .andExpect(jsonPath("$.choices").value(DEFAULT_CHOICES))
            .andExpect(jsonPath("$.icon").value(DEFAULT_ICON))
            .andExpect(jsonPath("$.answer").value(DEFAULT_ANSWER))
            .andExpect(jsonPath("$.time").value(DEFAULT_TIME.toString()));
    }


    @Test
    @Transactional
    public void getQuestionsByIdFiltering() throws Exception {
        // Initialize the database
        questionRepository.saveAndFlush(question);

        Long id = question.getId();

        defaultQuestionShouldBeFound("id.equals=" + id);
        defaultQuestionShouldNotBeFound("id.notEquals=" + id);

        defaultQuestionShouldBeFound("id.greaterThanOrEqual=" + id);
        defaultQuestionShouldNotBeFound("id.greaterThan=" + id);

        defaultQuestionShouldBeFound("id.lessThanOrEqual=" + id);
        defaultQuestionShouldNotBeFound("id.lessThan=" + id);
    }


    @Test
    @Transactional
    public void getAllQuestionsByTextIsEqualToSomething() throws Exception {
        // Initialize the database
        questionRepository.saveAndFlush(question);

        // Get all the questionList where text equals to DEFAULT_TEXT
        defaultQuestionShouldBeFound("text.equals=" + DEFAULT_TEXT);

        // Get all the questionList where text equals to UPDATED_TEXT
        defaultQuestionShouldNotBeFound("text.equals=" + UPDATED_TEXT);
    }

    @Test
    @Transactional
    public void getAllQuestionsByTextIsNotEqualToSomething() throws Exception {
        // Initialize the database
        questionRepository.saveAndFlush(question);

        // Get all the questionList where text not equals to DEFAULT_TEXT
        defaultQuestionShouldNotBeFound("text.notEquals=" + DEFAULT_TEXT);

        // Get all the questionList where text not equals to UPDATED_TEXT
        defaultQuestionShouldBeFound("text.notEquals=" + UPDATED_TEXT);
    }

    @Test
    @Transactional
    public void getAllQuestionsByTextIsInShouldWork() throws Exception {
        // Initialize the database
        questionRepository.saveAndFlush(question);

        // Get all the questionList where text in DEFAULT_TEXT or UPDATED_TEXT
        defaultQuestionShouldBeFound("text.in=" + DEFAULT_TEXT + "," + UPDATED_TEXT);

        // Get all the questionList where text equals to UPDATED_TEXT
        defaultQuestionShouldNotBeFound("text.in=" + UPDATED_TEXT);
    }

    @Test
    @Transactional
    public void getAllQuestionsByTextIsNullOrNotNull() throws Exception {
        // Initialize the database
        questionRepository.saveAndFlush(question);

        // Get all the questionList where text is not null
        defaultQuestionShouldBeFound("text.specified=true");

        // Get all the questionList where text is null
        defaultQuestionShouldNotBeFound("text.specified=false");
    }
                @Test
    @Transactional
    public void getAllQuestionsByTextContainsSomething() throws Exception {
        // Initialize the database
        questionRepository.saveAndFlush(question);

        // Get all the questionList where text contains DEFAULT_TEXT
        defaultQuestionShouldBeFound("text.contains=" + DEFAULT_TEXT);

        // Get all the questionList where text contains UPDATED_TEXT
        defaultQuestionShouldNotBeFound("text.contains=" + UPDATED_TEXT);
    }

    @Test
    @Transactional
    public void getAllQuestionsByTextNotContainsSomething() throws Exception {
        // Initialize the database
        questionRepository.saveAndFlush(question);

        // Get all the questionList where text does not contain DEFAULT_TEXT
        defaultQuestionShouldNotBeFound("text.doesNotContain=" + DEFAULT_TEXT);

        // Get all the questionList where text does not contain UPDATED_TEXT
        defaultQuestionShouldBeFound("text.doesNotContain=" + UPDATED_TEXT);
    }


    @Test
    @Transactional
    public void getAllQuestionsByChoicesIsEqualToSomething() throws Exception {
        // Initialize the database
        questionRepository.saveAndFlush(question);

        // Get all the questionList where choices equals to DEFAULT_CHOICES
        defaultQuestionShouldBeFound("choices.equals=" + DEFAULT_CHOICES);

        // Get all the questionList where choices equals to UPDATED_CHOICES
        defaultQuestionShouldNotBeFound("choices.equals=" + UPDATED_CHOICES);
    }

    @Test
    @Transactional
    public void getAllQuestionsByChoicesIsNotEqualToSomething() throws Exception {
        // Initialize the database
        questionRepository.saveAndFlush(question);

        // Get all the questionList where choices not equals to DEFAULT_CHOICES
        defaultQuestionShouldNotBeFound("choices.notEquals=" + DEFAULT_CHOICES);

        // Get all the questionList where choices not equals to UPDATED_CHOICES
        defaultQuestionShouldBeFound("choices.notEquals=" + UPDATED_CHOICES);
    }

    @Test
    @Transactional
    public void getAllQuestionsByChoicesIsInShouldWork() throws Exception {
        // Initialize the database
        questionRepository.saveAndFlush(question);

        // Get all the questionList where choices in DEFAULT_CHOICES or UPDATED_CHOICES
        defaultQuestionShouldBeFound("choices.in=" + DEFAULT_CHOICES + "," + UPDATED_CHOICES);

        // Get all the questionList where choices equals to UPDATED_CHOICES
        defaultQuestionShouldNotBeFound("choices.in=" + UPDATED_CHOICES);
    }

    @Test
    @Transactional
    public void getAllQuestionsByChoicesIsNullOrNotNull() throws Exception {
        // Initialize the database
        questionRepository.saveAndFlush(question);

        // Get all the questionList where choices is not null
        defaultQuestionShouldBeFound("choices.specified=true");

        // Get all the questionList where choices is null
        defaultQuestionShouldNotBeFound("choices.specified=false");
    }
                @Test
    @Transactional
    public void getAllQuestionsByChoicesContainsSomething() throws Exception {
        // Initialize the database
        questionRepository.saveAndFlush(question);

        // Get all the questionList where choices contains DEFAULT_CHOICES
        defaultQuestionShouldBeFound("choices.contains=" + DEFAULT_CHOICES);

        // Get all the questionList where choices contains UPDATED_CHOICES
        defaultQuestionShouldNotBeFound("choices.contains=" + UPDATED_CHOICES);
    }

    @Test
    @Transactional
    public void getAllQuestionsByChoicesNotContainsSomething() throws Exception {
        // Initialize the database
        questionRepository.saveAndFlush(question);

        // Get all the questionList where choices does not contain DEFAULT_CHOICES
        defaultQuestionShouldNotBeFound("choices.doesNotContain=" + DEFAULT_CHOICES);

        // Get all the questionList where choices does not contain UPDATED_CHOICES
        defaultQuestionShouldBeFound("choices.doesNotContain=" + UPDATED_CHOICES);
    }


    @Test
    @Transactional
    public void getAllQuestionsByIconIsEqualToSomething() throws Exception {
        // Initialize the database
        questionRepository.saveAndFlush(question);

        // Get all the questionList where icon equals to DEFAULT_ICON
        defaultQuestionShouldBeFound("icon.equals=" + DEFAULT_ICON);

        // Get all the questionList where icon equals to UPDATED_ICON
        defaultQuestionShouldNotBeFound("icon.equals=" + UPDATED_ICON);
    }

    @Test
    @Transactional
    public void getAllQuestionsByIconIsNotEqualToSomething() throws Exception {
        // Initialize the database
        questionRepository.saveAndFlush(question);

        // Get all the questionList where icon not equals to DEFAULT_ICON
        defaultQuestionShouldNotBeFound("icon.notEquals=" + DEFAULT_ICON);

        // Get all the questionList where icon not equals to UPDATED_ICON
        defaultQuestionShouldBeFound("icon.notEquals=" + UPDATED_ICON);
    }

    @Test
    @Transactional
    public void getAllQuestionsByIconIsInShouldWork() throws Exception {
        // Initialize the database
        questionRepository.saveAndFlush(question);

        // Get all the questionList where icon in DEFAULT_ICON or UPDATED_ICON
        defaultQuestionShouldBeFound("icon.in=" + DEFAULT_ICON + "," + UPDATED_ICON);

        // Get all the questionList where icon equals to UPDATED_ICON
        defaultQuestionShouldNotBeFound("icon.in=" + UPDATED_ICON);
    }

    @Test
    @Transactional
    public void getAllQuestionsByIconIsNullOrNotNull() throws Exception {
        // Initialize the database
        questionRepository.saveAndFlush(question);

        // Get all the questionList where icon is not null
        defaultQuestionShouldBeFound("icon.specified=true");

        // Get all the questionList where icon is null
        defaultQuestionShouldNotBeFound("icon.specified=false");
    }
                @Test
    @Transactional
    public void getAllQuestionsByIconContainsSomething() throws Exception {
        // Initialize the database
        questionRepository.saveAndFlush(question);

        // Get all the questionList where icon contains DEFAULT_ICON
        defaultQuestionShouldBeFound("icon.contains=" + DEFAULT_ICON);

        // Get all the questionList where icon contains UPDATED_ICON
        defaultQuestionShouldNotBeFound("icon.contains=" + UPDATED_ICON);
    }

    @Test
    @Transactional
    public void getAllQuestionsByIconNotContainsSomething() throws Exception {
        // Initialize the database
        questionRepository.saveAndFlush(question);

        // Get all the questionList where icon does not contain DEFAULT_ICON
        defaultQuestionShouldNotBeFound("icon.doesNotContain=" + DEFAULT_ICON);

        // Get all the questionList where icon does not contain UPDATED_ICON
        defaultQuestionShouldBeFound("icon.doesNotContain=" + UPDATED_ICON);
    }


    @Test
    @Transactional
    public void getAllQuestionsByAnswerIsEqualToSomething() throws Exception {
        // Initialize the database
        questionRepository.saveAndFlush(question);

        // Get all the questionList where answer equals to DEFAULT_ANSWER
        defaultQuestionShouldBeFound("answer.equals=" + DEFAULT_ANSWER);

        // Get all the questionList where answer equals to UPDATED_ANSWER
        defaultQuestionShouldNotBeFound("answer.equals=" + UPDATED_ANSWER);
    }

    @Test
    @Transactional
    public void getAllQuestionsByAnswerIsNotEqualToSomething() throws Exception {
        // Initialize the database
        questionRepository.saveAndFlush(question);

        // Get all the questionList where answer not equals to DEFAULT_ANSWER
        defaultQuestionShouldNotBeFound("answer.notEquals=" + DEFAULT_ANSWER);

        // Get all the questionList where answer not equals to UPDATED_ANSWER
        defaultQuestionShouldBeFound("answer.notEquals=" + UPDATED_ANSWER);
    }

    @Test
    @Transactional
    public void getAllQuestionsByAnswerIsInShouldWork() throws Exception {
        // Initialize the database
        questionRepository.saveAndFlush(question);

        // Get all the questionList where answer in DEFAULT_ANSWER or UPDATED_ANSWER
        defaultQuestionShouldBeFound("answer.in=" + DEFAULT_ANSWER + "," + UPDATED_ANSWER);

        // Get all the questionList where answer equals to UPDATED_ANSWER
        defaultQuestionShouldNotBeFound("answer.in=" + UPDATED_ANSWER);
    }

    @Test
    @Transactional
    public void getAllQuestionsByAnswerIsNullOrNotNull() throws Exception {
        // Initialize the database
        questionRepository.saveAndFlush(question);

        // Get all the questionList where answer is not null
        defaultQuestionShouldBeFound("answer.specified=true");

        // Get all the questionList where answer is null
        defaultQuestionShouldNotBeFound("answer.specified=false");
    }
                @Test
    @Transactional
    public void getAllQuestionsByAnswerContainsSomething() throws Exception {
        // Initialize the database
        questionRepository.saveAndFlush(question);

        // Get all the questionList where answer contains DEFAULT_ANSWER
        defaultQuestionShouldBeFound("answer.contains=" + DEFAULT_ANSWER);

        // Get all the questionList where answer contains UPDATED_ANSWER
        defaultQuestionShouldNotBeFound("answer.contains=" + UPDATED_ANSWER);
    }

    @Test
    @Transactional
    public void getAllQuestionsByAnswerNotContainsSomething() throws Exception {
        // Initialize the database
        questionRepository.saveAndFlush(question);

        // Get all the questionList where answer does not contain DEFAULT_ANSWER
        defaultQuestionShouldNotBeFound("answer.doesNotContain=" + DEFAULT_ANSWER);

        // Get all the questionList where answer does not contain UPDATED_ANSWER
        defaultQuestionShouldBeFound("answer.doesNotContain=" + UPDATED_ANSWER);
    }


    @Test
    @Transactional
    public void getAllQuestionsByTimeIsEqualToSomething() throws Exception {
        // Initialize the database
        questionRepository.saveAndFlush(question);

        // Get all the questionList where time equals to DEFAULT_TIME
        defaultQuestionShouldBeFound("time.equals=" + DEFAULT_TIME);

        // Get all the questionList where time equals to UPDATED_TIME
        defaultQuestionShouldNotBeFound("time.equals=" + UPDATED_TIME);
    }

    @Test
    @Transactional
    public void getAllQuestionsByTimeIsNotEqualToSomething() throws Exception {
        // Initialize the database
        questionRepository.saveAndFlush(question);

        // Get all the questionList where time not equals to DEFAULT_TIME
        defaultQuestionShouldNotBeFound("time.notEquals=" + DEFAULT_TIME);

        // Get all the questionList where time not equals to UPDATED_TIME
        defaultQuestionShouldBeFound("time.notEquals=" + UPDATED_TIME);
    }

    @Test
    @Transactional
    public void getAllQuestionsByTimeIsInShouldWork() throws Exception {
        // Initialize the database
        questionRepository.saveAndFlush(question);

        // Get all the questionList where time in DEFAULT_TIME or UPDATED_TIME
        defaultQuestionShouldBeFound("time.in=" + DEFAULT_TIME + "," + UPDATED_TIME);

        // Get all the questionList where time equals to UPDATED_TIME
        defaultQuestionShouldNotBeFound("time.in=" + UPDATED_TIME);
    }

    @Test
    @Transactional
    public void getAllQuestionsByTimeIsNullOrNotNull() throws Exception {
        // Initialize the database
        questionRepository.saveAndFlush(question);

        // Get all the questionList where time is not null
        defaultQuestionShouldBeFound("time.specified=true");

        // Get all the questionList where time is null
        defaultQuestionShouldNotBeFound("time.specified=false");
    }

    @Test
    @Transactional
    public void getAllQuestionsByAnswersIsEqualToSomething() throws Exception {
        // Initialize the database
        questionRepository.saveAndFlush(question);
        Answer answers = AnswerResourceIT.createEntity(em);
        em.persist(answers);
        em.flush();
        question.addAnswers(answers);
        questionRepository.saveAndFlush(question);
        Long answersId = answers.getId();

        // Get all the questionList where answers equals to answersId
        defaultQuestionShouldBeFound("answersId.equals=" + answersId);

        // Get all the questionList where answers equals to answersId + 1
        defaultQuestionShouldNotBeFound("answersId.equals=" + (answersId + 1));
    }

    /**
     * Executes the search, and checks that the default entity is returned.
     */
    private void defaultQuestionShouldBeFound(String filter) throws Exception {
        restQuestionMockMvc.perform(get("/api/questions?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(question.getId().intValue())))
            .andExpect(jsonPath("$.[*].text").value(hasItem(DEFAULT_TEXT)))
            .andExpect(jsonPath("$.[*].choices").value(hasItem(DEFAULT_CHOICES)))
            .andExpect(jsonPath("$.[*].icon").value(hasItem(DEFAULT_ICON)))
            .andExpect(jsonPath("$.[*].answer").value(hasItem(DEFAULT_ANSWER)))
            .andExpect(jsonPath("$.[*].time").value(hasItem(DEFAULT_TIME.toString())));

        // Check, that the count call also returns 1
        restQuestionMockMvc.perform(get("/api/questions/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(content().string("1"));
    }

    /**
     * Executes the search, and checks that the default entity is not returned.
     */
    private void defaultQuestionShouldNotBeFound(String filter) throws Exception {
        restQuestionMockMvc.perform(get("/api/questions?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$").isArray())
            .andExpect(jsonPath("$").isEmpty());

        // Check, that the count call also returns 0
        restQuestionMockMvc.perform(get("/api/questions/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(content().string("0"));
    }


    @Test
    @Transactional
    public void getNonExistingQuestion() throws Exception {
        // Get the question
        restQuestionMockMvc.perform(get("/api/questions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateQuestion() throws Exception {
        // Initialize the database
        questionService.save(question);

        int databaseSizeBeforeUpdate = questionRepository.findAll().size();

        // Update the question
        Question updatedQuestion = questionRepository.findById(question.getId()).get();
        // Disconnect from session so that the updates on updatedQuestion are not directly saved in db
        em.detach(updatedQuestion);
        updatedQuestion
            .text(UPDATED_TEXT)
            .choices(UPDATED_CHOICES)
            .icon(UPDATED_ICON)
            .answer(UPDATED_ANSWER)
            .time(UPDATED_TIME);

        restQuestionMockMvc.perform(put("/api/questions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedQuestion)))
            .andExpect(status().isOk());

        // Validate the Question in the database
        List<Question> questionList = questionRepository.findAll();
        assertThat(questionList).hasSize(databaseSizeBeforeUpdate);
        Question testQuestion = questionList.get(questionList.size() - 1);
        assertThat(testQuestion.getText()).isEqualTo(UPDATED_TEXT);
        assertThat(testQuestion.getChoices()).isEqualTo(UPDATED_CHOICES);
        assertThat(testQuestion.getIcon()).isEqualTo(UPDATED_ICON);
        assertThat(testQuestion.getAnswer()).isEqualTo(UPDATED_ANSWER);
        assertThat(testQuestion.getTime()).isEqualTo(UPDATED_TIME);
    }

    @Test
    @Transactional
    public void updateNonExistingQuestion() throws Exception {
        int databaseSizeBeforeUpdate = questionRepository.findAll().size();

        // Create the Question

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restQuestionMockMvc.perform(put("/api/questions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(question)))
            .andExpect(status().isBadRequest());

        // Validate the Question in the database
        List<Question> questionList = questionRepository.findAll();
        assertThat(questionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteQuestion() throws Exception {
        // Initialize the database
        questionService.save(question);

        int databaseSizeBeforeDelete = questionRepository.findAll().size();

        // Delete the question
        restQuestionMockMvc.perform(delete("/api/questions/{id}", question.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Question> questionList = questionRepository.findAll();
        assertThat(questionList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
