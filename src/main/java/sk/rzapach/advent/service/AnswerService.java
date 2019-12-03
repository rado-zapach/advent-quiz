package sk.rzapach.advent.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import sk.rzapach.advent.domain.Answer;
import sk.rzapach.advent.repository.AnswerRepository;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link Answer}.
 */
@Service
@Transactional
public class AnswerService {

    private final Logger log = LoggerFactory.getLogger(AnswerService.class);

    private final AnswerRepository answerRepository;

    public AnswerService(AnswerRepository answerRepository) {
        this.answerRepository = answerRepository;
    }

    /**
     * Save a answer.
     *
     * @param answer the entity to save.
     * @return the persisted entity.
     */
    public Answer save(Answer answer) {
        log.debug("Request to save Answer : {}", answer);
        return answerRepository.save(answer);
    }

    public Iterable<Answer> saveAll(Iterable<Answer> answers) {
        log.debug("Request to save Answers : {}", answers);
        return answerRepository.saveAll(answers);
    }

    /**
     * Get all the answers.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<Answer> findAll() {
        log.debug("Request to get all Answers");
        return answerRepository.findAll();
    }

    @Transactional(readOnly = true)
    public List<Answer> findAllByQuestionId(Long questionId) {
        log.debug("Request to get all Answers by questionId {}", questionId);
        return answerRepository.findAllByQuestionId(questionId);
    }

    /**
     * Get one answer by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<Answer> findOne(Long id) {
        log.debug("Request to get Answer : {}", id);
        return answerRepository.findById(id);
    }

    /**
     * Delete the answer by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Answer : {}", id);
        answerRepository.deleteById(id);
    }
}
