package sk.rzapach.advent.web.rest;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.util.Pair;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sk.rzapach.advent.domain.Question;
import sk.rzapach.advent.domain.User;
import sk.rzapach.advent.security.AuthoritiesConstants;
import sk.rzapach.advent.service.QuestionQueryService;
import sk.rzapach.advent.service.QuestionService;
import sk.rzapach.advent.service.UserService;
import sk.rzapach.advent.service.dto.QuestionCriteria;
import sk.rzapach.advent.web.rest.errors.BadRequestAlertException;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.time.Instant;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link sk.rzapach.advent.domain.Question}.
 */
@RestController
@RequestMapping("/api")
public class QuestionResource {

    private final Logger log = LoggerFactory.getLogger(QuestionResource.class);

    private static final String ENTITY_NAME = "question";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final QuestionService questionService;
    private final QuestionQueryService questionQueryService;
    private final UserService userService;

    public QuestionResource(QuestionService questionService, QuestionQueryService questionQueryService, UserService userService) {
        this.questionService = questionService;
        this.questionQueryService = questionQueryService;
        this.userService = userService;
    }

    private User getLoggedUser() {
        return userService.getUserWithAuthorities().get();
    }

    private boolean isAdmin(User user) {
        return user.getAuthorities().stream().anyMatch(a -> AuthoritiesConstants.ADMIN.equals(a.getName()));
    }

    /**
     * {@code POST  /questions} : Create a new question.
     *
     * @param question the question to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new question, or with status {@code 400 (Bad Request)} if the question has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/questions")
    public ResponseEntity<Question> createQuestion(@Valid @RequestBody Question question) throws URISyntaxException {
        log.debug("REST request to save Question : {}", question);
        if (question.getId() != null) {
            throw new BadRequestAlertException("A new question cannot already have an ID", ENTITY_NAME, "idexists");
        }

        if (!isAdmin(getLoggedUser())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        Question result = questionService.save(question);
        return ResponseEntity.created(new URI("/api/questions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /questions} : Updates an existing question.
     *
     * @param question the question to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated question,
     * or with status {@code 400 (Bad Request)} if the question is not valid,
     * or with status {@code 500 (Internal Server Error)} if the question couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/questions")
    public ResponseEntity<Question> updateQuestion(@Valid @RequestBody Question question) throws URISyntaxException {
        log.debug("REST request to update Question : {}", question);

        if (!isAdmin(getLoggedUser())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        if (question.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Question result = questionService.save(question);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, question.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /questions} : get all the questions.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of questions in body.
     */
    @GetMapping("/questions")
    public ResponseEntity<List<Question>> getAllQuestions(QuestionCriteria criteria) {
        log.debug("REST request to get Questions by criteria: {}", criteria);
        List<Question> entityList = questionQueryService.findByCriteria(criteria);
        entityList.forEach(this::sanitizeQuestion);
        return ResponseEntity.ok().body(entityList);
    }

    /**
     * {@code GET  /questions/count} : count all the questions.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the count in body.
     */
    @GetMapping("/questions/count")
    public ResponseEntity<Long> countQuestions(QuestionCriteria criteria) {
        log.debug("REST request to count Questions by criteria: {}", criteria);

        if (!isAdmin(getLoggedUser())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        return ResponseEntity.ok().body(questionQueryService.countByCriteria(criteria));
    }

    /**
     * {@code GET  /questions/:id} : get the "id" question.
     *
     * @param id the id of the question to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the question, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/questions/{id}")
    public ResponseEntity<Question> getQuestion(@PathVariable Long id) {
        log.debug("REST request to get Question : {}", id);
        Optional<Question> question = questionService.findOne(id);
        question.ifPresent(this::sanitizeQuestion);
        return ResponseUtil.wrapOrNotFound(question);
    }

    /**
     * {@code GET  /questions/:id} : get the answer stats for "id" question.
     *
     * @param id the id of the question to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the answer stats, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/questions/{id}/stats")
    public ResponseEntity<List<Pair<String, Integer>>> getQuestionStats(@PathVariable Long id) {
        log.debug("REST request to get answer stats for Question : {}", id);

        return ResponseEntity.ok().body(questionService.getQuestionAnswerStats(id));
    }

    /**
     * {@code DELETE  /questions/:id} : delete the "id" question.
     *
     * @param id the id of the question to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/questions/{id}")
    public ResponseEntity<Void> deleteQuestion(@PathVariable Long id) {
        log.debug("REST request to delete Question : {}", id);

        if (!isAdmin(getLoggedUser())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        questionService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }

    private void sanitizeQuestion(Question question) {
        if (!isAdmin(getLoggedUser())) {
            if (Instant.now().isBefore(question.getTime())) {
                question.setText("");
                question.setChoices("");
            }
            if (!question.isShowAnswer() || question.isShowAnswer() == null) {
                question.setAnswer("");
            }
        }
    }
}
