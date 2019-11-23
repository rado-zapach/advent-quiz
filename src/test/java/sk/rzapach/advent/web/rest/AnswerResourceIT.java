package sk.rzapach.advent.web.rest;

import sk.rzapach.advent.AdventQuizApp;
import sk.rzapach.advent.domain.Answer;
import sk.rzapach.advent.domain.Question;
import sk.rzapach.advent.domain.User;
import sk.rzapach.advent.repository.AnswerRepository;
import sk.rzapach.advent.service.AnswerService;
import sk.rzapach.advent.service.UserService;
import sk.rzapach.advent.web.rest.errors.ExceptionTranslator;
import sk.rzapach.advent.service.dto.AnswerCriteria;
import sk.rzapach.advent.service.AnswerQueryService;

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
 * Integration tests for the {@link AnswerResource} REST controller.
 */
@SpringBootTest(classes = AdventQuizApp.class)
public class AnswerResourceIT {

    private static final String DEFAULT_TEXT = "AAAAAAAAAA";
    private static final String UPDATED_TEXT = "BBBBBBBBBB";

    private static final Instant DEFAULT_TIME = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_TIME = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Boolean DEFAULT_IS_CORRECT = false;
    private static final Boolean UPDATED_IS_CORRECT = true;

    private static final Integer DEFAULT_POINTS = 1;
    private static final Integer UPDATED_POINTS = 2;
    private static final Integer SMALLER_POINTS = 1 - 1;

    @Autowired
    private AnswerRepository answerRepository;

    @Autowired
    private AnswerService answerService;

    @Autowired
    private AnswerQueryService answerQueryService;

    @Autowired
    private UserService userService;

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

    private MockMvc restAnswerMockMvc;

    private Answer answer;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AnswerResource answerResource = new AnswerResource(answerService, answerQueryService, userService);
        this.restAnswerMockMvc = MockMvcBuilders.standaloneSetup(answerResource)
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
    public static Answer createEntity(EntityManager em) {
        Answer answer = new Answer()
            .text(DEFAULT_TEXT)
            .time(DEFAULT_TIME)
            .isCorrect(DEFAULT_IS_CORRECT)
            .points(DEFAULT_POINTS);
        return answer;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Answer createUpdatedEntity(EntityManager em) {
        Answer answer = new Answer()
            .text(UPDATED_TEXT)
            .time(UPDATED_TIME)
            .isCorrect(UPDATED_IS_CORRECT)
            .points(UPDATED_POINTS);
        return answer;
    }

    @BeforeEach
    public void initTest() {
        answer = createEntity(em);
    }

    @Test
    @Transactional
    public void createAnswer() throws Exception {
        int databaseSizeBeforeCreate = answerRepository.findAll().size();

        // Create the Answer
        restAnswerMockMvc.perform(post("/api/answers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(answer)))
            .andExpect(status().isCreated());

        // Validate the Answer in the database
        List<Answer> answerList = answerRepository.findAll();
        assertThat(answerList).hasSize(databaseSizeBeforeCreate + 1);
        Answer testAnswer = answerList.get(answerList.size() - 1);
        assertThat(testAnswer.getText()).isEqualTo(DEFAULT_TEXT);
        assertThat(testAnswer.getTime()).isEqualTo(DEFAULT_TIME);
        assertThat(testAnswer.isIsCorrect()).isEqualTo(DEFAULT_IS_CORRECT);
        assertThat(testAnswer.getPoints()).isEqualTo(DEFAULT_POINTS);
    }

    @Test
    @Transactional
    public void createAnswerWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = answerRepository.findAll().size();

        // Create the Answer with an existing ID
        answer.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAnswerMockMvc.perform(post("/api/answers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(answer)))
            .andExpect(status().isBadRequest());

        // Validate the Answer in the database
        List<Answer> answerList = answerRepository.findAll();
        assertThat(answerList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllAnswers() throws Exception {
        // Initialize the database
        answerRepository.saveAndFlush(answer);

        // Get all the answerList
        restAnswerMockMvc.perform(get("/api/answers?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(answer.getId().intValue())))
            .andExpect(jsonPath("$.[*].text").value(hasItem(DEFAULT_TEXT)))
            .andExpect(jsonPath("$.[*].time").value(hasItem(DEFAULT_TIME.toString())))
            .andExpect(jsonPath("$.[*].isCorrect").value(hasItem(DEFAULT_IS_CORRECT.booleanValue())))
            .andExpect(jsonPath("$.[*].points").value(hasItem(DEFAULT_POINTS)));
    }

    @Test
    @Transactional
    public void getAnswer() throws Exception {
        // Initialize the database
        answerRepository.saveAndFlush(answer);

        // Get the answer
        restAnswerMockMvc.perform(get("/api/answers/{id}", answer.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(answer.getId().intValue()))
            .andExpect(jsonPath("$.text").value(DEFAULT_TEXT))
            .andExpect(jsonPath("$.time").value(DEFAULT_TIME.toString()))
            .andExpect(jsonPath("$.isCorrect").value(DEFAULT_IS_CORRECT.booleanValue()))
            .andExpect(jsonPath("$.points").value(DEFAULT_POINTS));
    }


    @Test
    @Transactional
    public void getAnswersByIdFiltering() throws Exception {
        // Initialize the database
        answerRepository.saveAndFlush(answer);

        Long id = answer.getId();

        defaultAnswerShouldBeFound("id.equals=" + id);
        defaultAnswerShouldNotBeFound("id.notEquals=" + id);

        defaultAnswerShouldBeFound("id.greaterThanOrEqual=" + id);
        defaultAnswerShouldNotBeFound("id.greaterThan=" + id);

        defaultAnswerShouldBeFound("id.lessThanOrEqual=" + id);
        defaultAnswerShouldNotBeFound("id.lessThan=" + id);
    }


    @Test
    @Transactional
    public void getAllAnswersByTextIsEqualToSomething() throws Exception {
        // Initialize the database
        answerRepository.saveAndFlush(answer);

        // Get all the answerList where text equals to DEFAULT_TEXT
        defaultAnswerShouldBeFound("text.equals=" + DEFAULT_TEXT);

        // Get all the answerList where text equals to UPDATED_TEXT
        defaultAnswerShouldNotBeFound("text.equals=" + UPDATED_TEXT);
    }

    @Test
    @Transactional
    public void getAllAnswersByTextIsNotEqualToSomething() throws Exception {
        // Initialize the database
        answerRepository.saveAndFlush(answer);

        // Get all the answerList where text not equals to DEFAULT_TEXT
        defaultAnswerShouldNotBeFound("text.notEquals=" + DEFAULT_TEXT);

        // Get all the answerList where text not equals to UPDATED_TEXT
        defaultAnswerShouldBeFound("text.notEquals=" + UPDATED_TEXT);
    }

    @Test
    @Transactional
    public void getAllAnswersByTextIsInShouldWork() throws Exception {
        // Initialize the database
        answerRepository.saveAndFlush(answer);

        // Get all the answerList where text in DEFAULT_TEXT or UPDATED_TEXT
        defaultAnswerShouldBeFound("text.in=" + DEFAULT_TEXT + "," + UPDATED_TEXT);

        // Get all the answerList where text equals to UPDATED_TEXT
        defaultAnswerShouldNotBeFound("text.in=" + UPDATED_TEXT);
    }

    @Test
    @Transactional
    public void getAllAnswersByTextIsNullOrNotNull() throws Exception {
        // Initialize the database
        answerRepository.saveAndFlush(answer);

        // Get all the answerList where text is not null
        defaultAnswerShouldBeFound("text.specified=true");

        // Get all the answerList where text is null
        defaultAnswerShouldNotBeFound("text.specified=false");
    }
                @Test
    @Transactional
    public void getAllAnswersByTextContainsSomething() throws Exception {
        // Initialize the database
        answerRepository.saveAndFlush(answer);

        // Get all the answerList where text contains DEFAULT_TEXT
        defaultAnswerShouldBeFound("text.contains=" + DEFAULT_TEXT);

        // Get all the answerList where text contains UPDATED_TEXT
        defaultAnswerShouldNotBeFound("text.contains=" + UPDATED_TEXT);
    }

    @Test
    @Transactional
    public void getAllAnswersByTextNotContainsSomething() throws Exception {
        // Initialize the database
        answerRepository.saveAndFlush(answer);

        // Get all the answerList where text does not contain DEFAULT_TEXT
        defaultAnswerShouldNotBeFound("text.doesNotContain=" + DEFAULT_TEXT);

        // Get all the answerList where text does not contain UPDATED_TEXT
        defaultAnswerShouldBeFound("text.doesNotContain=" + UPDATED_TEXT);
    }


    @Test
    @Transactional
    public void getAllAnswersByTimeIsEqualToSomething() throws Exception {
        // Initialize the database
        answerRepository.saveAndFlush(answer);

        // Get all the answerList where time equals to DEFAULT_TIME
        defaultAnswerShouldBeFound("time.equals=" + DEFAULT_TIME);

        // Get all the answerList where time equals to UPDATED_TIME
        defaultAnswerShouldNotBeFound("time.equals=" + UPDATED_TIME);
    }

    @Test
    @Transactional
    public void getAllAnswersByTimeIsNotEqualToSomething() throws Exception {
        // Initialize the database
        answerRepository.saveAndFlush(answer);

        // Get all the answerList where time not equals to DEFAULT_TIME
        defaultAnswerShouldNotBeFound("time.notEquals=" + DEFAULT_TIME);

        // Get all the answerList where time not equals to UPDATED_TIME
        defaultAnswerShouldBeFound("time.notEquals=" + UPDATED_TIME);
    }

    @Test
    @Transactional
    public void getAllAnswersByTimeIsInShouldWork() throws Exception {
        // Initialize the database
        answerRepository.saveAndFlush(answer);

        // Get all the answerList where time in DEFAULT_TIME or UPDATED_TIME
        defaultAnswerShouldBeFound("time.in=" + DEFAULT_TIME + "," + UPDATED_TIME);

        // Get all the answerList where time equals to UPDATED_TIME
        defaultAnswerShouldNotBeFound("time.in=" + UPDATED_TIME);
    }

    @Test
    @Transactional
    public void getAllAnswersByTimeIsNullOrNotNull() throws Exception {
        // Initialize the database
        answerRepository.saveAndFlush(answer);

        // Get all the answerList where time is not null
        defaultAnswerShouldBeFound("time.specified=true");

        // Get all the answerList where time is null
        defaultAnswerShouldNotBeFound("time.specified=false");
    }

    @Test
    @Transactional
    public void getAllAnswersByIsCorrectIsEqualToSomething() throws Exception {
        // Initialize the database
        answerRepository.saveAndFlush(answer);

        // Get all the answerList where isCorrect equals to DEFAULT_IS_CORRECT
        defaultAnswerShouldBeFound("isCorrect.equals=" + DEFAULT_IS_CORRECT);

        // Get all the answerList where isCorrect equals to UPDATED_IS_CORRECT
        defaultAnswerShouldNotBeFound("isCorrect.equals=" + UPDATED_IS_CORRECT);
    }

    @Test
    @Transactional
    public void getAllAnswersByIsCorrectIsNotEqualToSomething() throws Exception {
        // Initialize the database
        answerRepository.saveAndFlush(answer);

        // Get all the answerList where isCorrect not equals to DEFAULT_IS_CORRECT
        defaultAnswerShouldNotBeFound("isCorrect.notEquals=" + DEFAULT_IS_CORRECT);

        // Get all the answerList where isCorrect not equals to UPDATED_IS_CORRECT
        defaultAnswerShouldBeFound("isCorrect.notEquals=" + UPDATED_IS_CORRECT);
    }

    @Test
    @Transactional
    public void getAllAnswersByIsCorrectIsInShouldWork() throws Exception {
        // Initialize the database
        answerRepository.saveAndFlush(answer);

        // Get all the answerList where isCorrect in DEFAULT_IS_CORRECT or UPDATED_IS_CORRECT
        defaultAnswerShouldBeFound("isCorrect.in=" + DEFAULT_IS_CORRECT + "," + UPDATED_IS_CORRECT);

        // Get all the answerList where isCorrect equals to UPDATED_IS_CORRECT
        defaultAnswerShouldNotBeFound("isCorrect.in=" + UPDATED_IS_CORRECT);
    }

    @Test
    @Transactional
    public void getAllAnswersByIsCorrectIsNullOrNotNull() throws Exception {
        // Initialize the database
        answerRepository.saveAndFlush(answer);

        // Get all the answerList where isCorrect is not null
        defaultAnswerShouldBeFound("isCorrect.specified=true");

        // Get all the answerList where isCorrect is null
        defaultAnswerShouldNotBeFound("isCorrect.specified=false");
    }

    @Test
    @Transactional
    public void getAllAnswersByPointsIsEqualToSomething() throws Exception {
        // Initialize the database
        answerRepository.saveAndFlush(answer);

        // Get all the answerList where points equals to DEFAULT_POINTS
        defaultAnswerShouldBeFound("points.equals=" + DEFAULT_POINTS);

        // Get all the answerList where points equals to UPDATED_POINTS
        defaultAnswerShouldNotBeFound("points.equals=" + UPDATED_POINTS);
    }

    @Test
    @Transactional
    public void getAllAnswersByPointsIsNotEqualToSomething() throws Exception {
        // Initialize the database
        answerRepository.saveAndFlush(answer);

        // Get all the answerList where points not equals to DEFAULT_POINTS
        defaultAnswerShouldNotBeFound("points.notEquals=" + DEFAULT_POINTS);

        // Get all the answerList where points not equals to UPDATED_POINTS
        defaultAnswerShouldBeFound("points.notEquals=" + UPDATED_POINTS);
    }

    @Test
    @Transactional
    public void getAllAnswersByPointsIsInShouldWork() throws Exception {
        // Initialize the database
        answerRepository.saveAndFlush(answer);

        // Get all the answerList where points in DEFAULT_POINTS or UPDATED_POINTS
        defaultAnswerShouldBeFound("points.in=" + DEFAULT_POINTS + "," + UPDATED_POINTS);

        // Get all the answerList where points equals to UPDATED_POINTS
        defaultAnswerShouldNotBeFound("points.in=" + UPDATED_POINTS);
    }

    @Test
    @Transactional
    public void getAllAnswersByPointsIsNullOrNotNull() throws Exception {
        // Initialize the database
        answerRepository.saveAndFlush(answer);

        // Get all the answerList where points is not null
        defaultAnswerShouldBeFound("points.specified=true");

        // Get all the answerList where points is null
        defaultAnswerShouldNotBeFound("points.specified=false");
    }

    @Test
    @Transactional
    public void getAllAnswersByPointsIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        answerRepository.saveAndFlush(answer);

        // Get all the answerList where points is greater than or equal to DEFAULT_POINTS
        defaultAnswerShouldBeFound("points.greaterThanOrEqual=" + DEFAULT_POINTS);

        // Get all the answerList where points is greater than or equal to UPDATED_POINTS
        defaultAnswerShouldNotBeFound("points.greaterThanOrEqual=" + UPDATED_POINTS);
    }

    @Test
    @Transactional
    public void getAllAnswersByPointsIsLessThanOrEqualToSomething() throws Exception {
        // Initialize the database
        answerRepository.saveAndFlush(answer);

        // Get all the answerList where points is less than or equal to DEFAULT_POINTS
        defaultAnswerShouldBeFound("points.lessThanOrEqual=" + DEFAULT_POINTS);

        // Get all the answerList where points is less than or equal to SMALLER_POINTS
        defaultAnswerShouldNotBeFound("points.lessThanOrEqual=" + SMALLER_POINTS);
    }

    @Test
    @Transactional
    public void getAllAnswersByPointsIsLessThanSomething() throws Exception {
        // Initialize the database
        answerRepository.saveAndFlush(answer);

        // Get all the answerList where points is less than DEFAULT_POINTS
        defaultAnswerShouldNotBeFound("points.lessThan=" + DEFAULT_POINTS);

        // Get all the answerList where points is less than UPDATED_POINTS
        defaultAnswerShouldBeFound("points.lessThan=" + UPDATED_POINTS);
    }

    @Test
    @Transactional
    public void getAllAnswersByPointsIsGreaterThanSomething() throws Exception {
        // Initialize the database
        answerRepository.saveAndFlush(answer);

        // Get all the answerList where points is greater than DEFAULT_POINTS
        defaultAnswerShouldNotBeFound("points.greaterThan=" + DEFAULT_POINTS);

        // Get all the answerList where points is greater than SMALLER_POINTS
        defaultAnswerShouldBeFound("points.greaterThan=" + SMALLER_POINTS);
    }


    @Test
    @Transactional
    public void getAllAnswersByQuestionIsEqualToSomething() throws Exception {
        // Initialize the database
        answerRepository.saveAndFlush(answer);
        Question question = QuestionResourceIT.createEntity(em);
        em.persist(question);
        em.flush();
        answer.setQuestion(question);
        answerRepository.saveAndFlush(answer);
        Long questionId = question.getId();

        // Get all the answerList where question equals to questionId
        defaultAnswerShouldBeFound("questionId.equals=" + questionId);

        // Get all the answerList where question equals to questionId + 1
        defaultAnswerShouldNotBeFound("questionId.equals=" + (questionId + 1));
    }


    @Test
    @Transactional
    public void getAllAnswersByUserIsEqualToSomething() throws Exception {
        // Initialize the database
        answerRepository.saveAndFlush(answer);
        User user = UserResourceIT.createEntity(em);
        em.persist(user);
        em.flush();
        answer.setUser(user);
        answerRepository.saveAndFlush(answer);
        Long userId = user.getId();

        // Get all the answerList where user equals to userId
        defaultAnswerShouldBeFound("userId.equals=" + userId);

        // Get all the answerList where user equals to userId + 1
        defaultAnswerShouldNotBeFound("userId.equals=" + (userId + 1));
    }

    /**
     * Executes the search, and checks that the default entity is returned.
     */
    private void defaultAnswerShouldBeFound(String filter) throws Exception {
        restAnswerMockMvc.perform(get("/api/answers?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(answer.getId().intValue())))
            .andExpect(jsonPath("$.[*].text").value(hasItem(DEFAULT_TEXT)))
            .andExpect(jsonPath("$.[*].time").value(hasItem(DEFAULT_TIME.toString())))
            .andExpect(jsonPath("$.[*].isCorrect").value(hasItem(DEFAULT_IS_CORRECT.booleanValue())))
            .andExpect(jsonPath("$.[*].points").value(hasItem(DEFAULT_POINTS)));

        // Check, that the count call also returns 1
        restAnswerMockMvc.perform(get("/api/answers/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(content().string("1"));
    }

    /**
     * Executes the search, and checks that the default entity is not returned.
     */
    private void defaultAnswerShouldNotBeFound(String filter) throws Exception {
        restAnswerMockMvc.perform(get("/api/answers?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$").isArray())
            .andExpect(jsonPath("$").isEmpty());

        // Check, that the count call also returns 0
        restAnswerMockMvc.perform(get("/api/answers/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(content().string("0"));
    }


    @Test
    @Transactional
    public void getNonExistingAnswer() throws Exception {
        // Get the answer
        restAnswerMockMvc.perform(get("/api/answers/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAnswer() throws Exception {
        // Initialize the database
        answerService.save(answer);

        int databaseSizeBeforeUpdate = answerRepository.findAll().size();

        // Update the answer
        Answer updatedAnswer = answerRepository.findById(answer.getId()).get();
        // Disconnect from session so that the updates on updatedAnswer are not directly saved in db
        em.detach(updatedAnswer);
        updatedAnswer
            .text(UPDATED_TEXT)
            .time(UPDATED_TIME)
            .isCorrect(UPDATED_IS_CORRECT)
            .points(UPDATED_POINTS);

        restAnswerMockMvc.perform(put("/api/answers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedAnswer)))
            .andExpect(status().isOk());

        // Validate the Answer in the database
        List<Answer> answerList = answerRepository.findAll();
        assertThat(answerList).hasSize(databaseSizeBeforeUpdate);
        Answer testAnswer = answerList.get(answerList.size() - 1);
        assertThat(testAnswer.getText()).isEqualTo(UPDATED_TEXT);
        assertThat(testAnswer.getTime()).isEqualTo(UPDATED_TIME);
        assertThat(testAnswer.isIsCorrect()).isEqualTo(UPDATED_IS_CORRECT);
        assertThat(testAnswer.getPoints()).isEqualTo(UPDATED_POINTS);
    }

    @Test
    @Transactional
    public void updateNonExistingAnswer() throws Exception {
        int databaseSizeBeforeUpdate = answerRepository.findAll().size();

        // Create the Answer

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAnswerMockMvc.perform(put("/api/answers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(answer)))
            .andExpect(status().isBadRequest());

        // Validate the Answer in the database
        List<Answer> answerList = answerRepository.findAll();
        assertThat(answerList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteAnswer() throws Exception {
        // Initialize the database
        answerService.save(answer);

        int databaseSizeBeforeDelete = answerRepository.findAll().size();

        // Delete the answer
        restAnswerMockMvc.perform(delete("/api/answers/{id}", answer.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Answer> answerList = answerRepository.findAll();
        assertThat(answerList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
