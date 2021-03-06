package sk.rzapach.advent.web.rest;

import io.github.jhipster.service.filter.LongFilter;
import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sk.rzapach.advent.domain.Answer;
import sk.rzapach.advent.domain.Question;
import sk.rzapach.advent.domain.User;
import sk.rzapach.advent.security.AuthoritiesConstants;
import sk.rzapach.advent.service.AnswerQueryService;
import sk.rzapach.advent.service.AnswerService;
import sk.rzapach.advent.service.QuestionService;
import sk.rzapach.advent.service.UserService;
import sk.rzapach.advent.service.dto.AnswerCriteria;
import sk.rzapach.advent.web.rest.errors.BadRequestAlertException;

import java.net.URI;
import java.net.URISyntaxException;
import java.time.Instant;
import java.util.*;
import java.util.stream.Collectors;

/**
 * REST controller for managing {@link sk.rzapach.advent.domain.Answer}.
 */
@RestController
@RequestMapping("/api")
public class AnswerResource {

    private final Logger log = LoggerFactory.getLogger(AnswerResource.class);

    private static final String ENTITY_NAME = "answer";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final AnswerService answerService;
    private final AnswerQueryService answerQueryService;
    private final UserService userService;
    private final QuestionService questionService;

    public AnswerResource(AnswerService answerService, AnswerQueryService answerQueryService, UserService userService, QuestionService questionService) {
        this.answerService = answerService;
        this.answerQueryService = answerQueryService;
        this.userService = userService;
        this.questionService = questionService;
    }

    private User getLoggedUser() {
        return userService.getUserWithAuthorities().get();
    }

    private boolean isAdmin(User user) {
        return user.getAuthorities().stream().anyMatch(a -> AuthoritiesConstants.ADMIN.equals(a.getName()));
    }

    /**
     * {@code POST  /answers} : Create a new answer.
     *
     * @param answer the answer to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new answer, or with status {@code 400 (Bad Request)} if the answer has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/answers")
    public ResponseEntity<Answer> createAnswer(@RequestBody Answer answer) throws URISyntaxException {
        log.debug("REST request to save Answer : {}", answer);
        if (answer.getId() != null) {
            throw new BadRequestAlertException("A new answer cannot already have an ID", ENTITY_NAME, "idexists");
        }

        User user = getLoggedUser();
        Instant now = Instant.now();

        answer.setTime(now);
        answer.setUser(user);
        answer.setIsCorrect(false);
        answer.setPoints(0);

        Optional<Question> question = questionService.findOne(answer.getQuestion().getId());
        if (question.isPresent() && question.get().getTime().isBefore(now) && !question.get().isShowAnswer()) {
            Question q = question.get();

            // remove old answer(s)
            LongFilter questionId = new LongFilter();
            questionId.setEquals(q.getId());
            LongFilter userId = new LongFilter();
            userId.setEquals(user.getId());
            AnswerCriteria quc = new AnswerCriteria();
            quc.setQuestionId(questionId);
            quc.setUserId(userId);
            List<Answer> userAnswers = answerQueryService.findByCriteria(quc);
            userAnswers.forEach(a -> answerService.delete(a.getId()));

            answer.setIsCorrect(q.getAnswer() != null
                && answer.getText() != null
                && q.getAnswer().length() != 0
                && StringUtils.stripAccents(q.getAnswer().toLowerCase()).equals(StringUtils.stripAccents(answer.getText().toLowerCase())));

            Answer result = answerService.save(answer);
            sanitizeAnswer(result);
            return ResponseEntity.created(new URI("/api/answers/" + result.getId()))
                .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
                .body(result);
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }

    /**
     * {@code PUT  /answers} : Updates an existing answer.
     *
     * @param answer the answer to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated answer,
     * or with status {@code 400 (Bad Request)} if the answer is not valid,
     * or with status {@code 500 (Internal Server Error)} if the answer couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/answers")
    public ResponseEntity<Answer> updateAnswer(@RequestBody Answer answer) throws URISyntaxException {
        log.debug("REST request to update Answer : {}", answer);

        Optional<Answer> a = answerService.findOne(answer.getId());
        if (!a.isPresent()) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        answer.setTime(a.get().getTime());

        if (!isAdmin(getLoggedUser())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        Answer result = answerService.save(answer);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, answer.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /answers} : get all the answers.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of answers in body.
     */
    @GetMapping("/answers")
    public ResponseEntity<List<Answer>> getAllAnswers(AnswerCriteria criteria) {
        log.debug("REST request to get Answers by criteria: {}", criteria);

        List<Answer> entityList = answerQueryService.findByCriteria(criteria);

        User user = getLoggedUser();
        if (!isAdmin(user)) {
            entityList.removeIf(a -> !user.equals(a.getUser()));
            entityList.forEach(this::sanitizeAnswer);
        }

        return ResponseEntity.ok().body(entityList);
    }

    /**
     * {@code GET  /answers/count} : count all the answers.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the count in body.
     */
    @GetMapping("/answers/count")
    public ResponseEntity<Long> countAnswers(AnswerCriteria criteria) {
        log.debug("REST request to count Answers by criteria: {}", criteria);

        if (!isAdmin(getLoggedUser())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        return ResponseEntity.ok().body(answerQueryService.countByCriteria(criteria));
    }

    /**
     * {@code GET  /answers/:id} : get the "id" answer.
     *
     * @param id the id of the answer to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the answer, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/answers/{id}")
    public ResponseEntity<Answer> getAnswer(@PathVariable Long id) {
        log.debug("REST request to get Answer : {}", id);

        if (!isAdmin(getLoggedUser())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        Optional<Answer> answer = answerService.findOne(id);
        return ResponseUtil.wrapOrNotFound(answer);
    }

    /**
     * {@code DELETE  /answers/:id} : delete the "id" answer.
     *
     * @param id the id of the answer to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/answers/{id}")
    public ResponseEntity<Void> deleteAnswer(@PathVariable Long id) {
        log.debug("REST request to delete Answer : {}", id);

        if (!isAdmin(getLoggedUser())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        answerService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }

    @GetMapping("/answers/times/{questionId}")
    public ResponseEntity<List<Answer>> getAnswersTimes(@PathVariable Long questionId) {
        log.debug("REST request to get answer times for a question");

        Optional<Question> q = questionService.findOne(questionId);
        if (!q.isPresent() || Boolean.FALSE.equals(q.get().isShowAnswer())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        } else {
            List<Answer> entityList = answerService.findAllByQuestionId(questionId);
            entityList.forEach(e -> {
                User u = new User();
                u.setLogin(e.getUser().getLogin());
                u.setFirstName(e.getUser().getFirstName());
                u.setLastName(e.getUser().getLastName());

                e.setText("");
                e.setQuestion(null);
                e.setUser(u);
            });
            return ResponseEntity.ok().body(entityList);
        }
    }

    /**
     * {@code GET  /answers/calculate : (re)calculates points for all the answers.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the answer, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/answers/calculate/{questionId}")
    public ResponseEntity<Integer> calculatePoints(@PathVariable Long questionId) {
        log.debug("REST request to (re)calculates points for all the answers");

        if (!isAdmin(getLoggedUser())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        } else {
            List<Answer> scoredAnswers = questionService.scoreAnswers(questionId);
            answerService.saveAll(scoredAnswers);
            return ResponseEntity.ok().body(scoredAnswers.size());
        }
    }

    /**
     * {@code GET  /answers/ranking : return user ranking based on calculated points.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the answer, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/answers/ranking")
    public ResponseEntity<List<Ranking>> getRanking() {
        log.debug("REST request to get user ranking based on calculated points ");

        Map<Long, Ranking> map = new HashMap<>();
        List<Answer> validAnswers = answerService.findAll()
            .stream()
            .filter(answer -> answer.getUser() != null
                && answer.getPoints() != null
                && answer.getQuestion() != null
                && Boolean.TRUE.equals(answer.getQuestion().isShowAnswer()))
            .collect(Collectors.toList());
        validAnswers.forEach(answer -> {
            User u = answer.getUser();
            if (!map.containsKey(u.getId())) {
                map.put(u.getId(), new Ranking(u));
            }
            Ranking r = map.get(u.getId());
            r.points += answer.getPoints();
            r.allAnswers++;
            if (Boolean.TRUE.equals(answer.isIsCorrect())) {
                r.correctAnswers++;
            }
            if (answer.getPoints() > 0) {
                r.scoredAnswers++;
                r.scoredAnswerTimes.add(answer.getTime().toEpochMilli() - answer.getQuestion().getTime().toEpochMilli());
            }
        });

        return ResponseEntity.ok().body(new ArrayList<Ranking>(map.values()));
    }

    static class Ranking {
        String login;
        String firstName;
        String lastName;
        Integer points = 0;
        Integer scoredAnswers = 0;
        Integer correctAnswers = 0;
        Integer allAnswers = 0;
        List<Long> scoredAnswerTimes = new ArrayList<>();

        Ranking(User u) {
            login = u.getLogin();
            firstName = u.getFirstName();
            lastName = u.getLastName();
        }

        public String getLogin() {
            return login;
        }

        public String getFirstName() {
            return firstName;
        }

        public String getLastName() {
            return lastName;
        }

        public Integer getPoints() {
            return points;
        }

        public Integer getScoredAnswers() {
            return scoredAnswers;
        }

        public Integer getCorrectAnswers() {
            return correctAnswers;
        }

        public Integer getAllAnswers() {
            return allAnswers;
        }

        public Long getAverageScoredAnswerTimeMs() {
            return scoredAnswerTimes.size() == 0 ? 0 : scoredAnswerTimes.stream().reduce(0L, Long::sum) / scoredAnswerTimes.size();
        }
    }

    private void sanitizeAnswer(Answer answer) {
        if (answer.getQuestion() != null && !answer.getQuestion().isShowAnswer()) {
            answer.setIsCorrect(null);
            answer.setPoints(null);
        }
        answer.setQuestion(null);
        answer.setUser(null);
    }
}
