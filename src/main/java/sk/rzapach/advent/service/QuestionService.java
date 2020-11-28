package sk.rzapach.advent.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.util.Pair;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import sk.rzapach.advent.domain.Answer;
import sk.rzapach.advent.domain.Question;
import sk.rzapach.advent.repository.AnswerRepository;
import sk.rzapach.advent.repository.QuestionRepository;

import java.util.*;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link Question}.
 */
@Service
@Transactional
public class QuestionService {

    private final Logger log = LoggerFactory.getLogger(QuestionService.class);

    private final QuestionRepository questionRepository;
    private final AnswerRepository answerRepository;

    public QuestionService(QuestionRepository questionRepository, AnswerRepository answerRepository) {
        this.questionRepository = questionRepository;
        this.answerRepository = answerRepository;
    }

    /**
     * Save a question.
     *
     * @param question the entity to save.
     * @return the persisted entity.
     */
    public Question save(Question question) {
        log.debug("Request to save Question : {}", question);
        return questionRepository.save(question);
    }

    /**
     * Get all the questions.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<Question> findAll() {
        log.debug("Request to get all Questions");
        return questionRepository.findAll();
    }


    /**
     * Get one question by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<Question> findOne(Long id) {
        log.debug("Request to get Question : {}", id);
        return questionRepository.findById(id);
    }

    /**
     * Delete the question by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Question : {}", id);
        questionRepository.deleteById(id);
    }

    public List<Answer> scoreAnswers(Long questionId) {
        List<Answer> answers = new ArrayList<>();
        answers = answerRepository.findAllByQuestionId(questionId);

        answers.forEach(a -> a.setPoints(0));
        List<Answer> scoredAnswers = answers.stream()
            .filter(a -> Boolean.TRUE.equals(a.isIsCorrect()))
            .sorted(Comparator.comparing(Answer::getTime))
            .collect(Collectors.toList());
        scoredAnswers.forEach(a -> a.setPoints(1));
        int maxPoints = 5;
        for (int i = 0; i < scoredAnswers.size() && i < maxPoints; i++) {
            Long aId = scoredAnswers.get(i).getId();
            int points = maxPoints - i;
            answers.stream().filter(a -> a.getId().equals(aId)).findFirst().get().setPoints(points);
        }
        return answers;
    }

    @Transactional(readOnly = true)
    public List<Pair<String, Integer>> getQuestionAnswerStats(Long id) {
        Map<String, Integer> stats = new HashMap<>();
        Optional<Question> question = findOne(id);
        if (question.isPresent() && Boolean.TRUE.equals(question.get().isShowAnswer())) {
            List<Answer> answers = answerRepository.findAllByQuestionId(id);
            if (question.get().getChoices() == null || question.get().getChoices().length() == 0) {
                answers.forEach(a -> {
                    if (Boolean.TRUE.equals(a.isIsCorrect())) {
                        stats.put("Correct", stats.getOrDefault("Correct", 0) + 1);
                    } else {
                        stats.put("Incorrect", stats.getOrDefault("Incorrect", 0) + 1);
                    }
                });
            } else {
                answers.forEach(a -> stats.put(a.getText(), stats.getOrDefault(a.getText(), 0) + 1));
            }
        }

        return stats.entrySet().stream().map(e -> Pair.of(e.getKey(), e.getValue())).collect(Collectors.toList());
    }
}
