package sk.rzapach.advent.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.util.Pair;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import sk.rzapach.advent.domain.Answer;
import sk.rzapach.advent.domain.Question;
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

    public QuestionService(QuestionRepository questionRepository) {
        this.questionRepository = questionRepository;
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

    public List<Answer> scoreAnswers() {
        List<Answer> scoredAnswers = new ArrayList<>();
        List<Question> questions = findAll();
        questions.forEach(q -> {
            List<Answer> answers = new ArrayList<>(q.getAnswers());
            answers.removeIf(a -> !a.isIsCorrect());
            answers.sort(Comparator.comparing(Answer::getTime));
            int maxPoints = 5;
            for (int i = 0; i < answers.size() && i < maxPoints; i++) {
                Answer a = answers.get(i);
                a.setPoints(maxPoints - i);
                scoredAnswers.add(a);
            }
        });
        return scoredAnswers;
    }

    @Transactional(readOnly = true)
    public List<Pair<String, Integer>> getQuestionAnswerStats(Long id) {
        Map<String, Integer> stats = new HashMap<>();
        Optional<Question> question = findOne(id);
        if (question.isPresent() && Boolean.TRUE.equals(question.get().isShowAnswer())) {
            Set<Answer> answers = question.get().getAnswers();
            if (question.get().getText() == null || question.get().getText().length() == 0) {
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
