package sk.rzapach.advent.repository;
import sk.rzapach.advent.domain.Answer;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Answer entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AnswerRepository extends JpaRepository<Answer, Long>, JpaSpecificationExecutor<Answer> {

    @Query("select answer from Answer answer where answer.user.login = ?#{principal.username}")
    List<Answer> findByUserIsCurrentUser();

}
