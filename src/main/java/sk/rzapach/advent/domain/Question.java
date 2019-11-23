package sk.rzapach.advent.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

/**
 * A Question.
 */
@Entity
@Table(name = "question")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Question implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "text")
    private String text;

    @Column(name = "choices")
    private String choices;

    @Column(name = "icon")
    private String icon;

    @Column(name = "answer")
    private String answer;

    @NotNull
    @Column(name = "time", nullable = false)
    private Instant time;

    @Column(name = "show_answer")
    private Boolean showAnswer;

    @OneToMany(mappedBy = "question")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Answer> answers = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getText() {
        return text;
    }

    public Question text(String text) {
        this.text = text;
        return this;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getChoices() {
        return choices;
    }

    public Question choices(String choices) {
        this.choices = choices;
        return this;
    }

    public void setChoices(String choices) {
        this.choices = choices;
    }

    public String getIcon() {
        return icon;
    }

    public Question icon(String icon) {
        this.icon = icon;
        return this;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }

    public String getAnswer() {
        return answer;
    }

    public Question answer(String answer) {
        this.answer = answer;
        return this;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }

    public Instant getTime() {
        return time;
    }

    public Question time(Instant time) {
        this.time = time;
        return this;
    }

    public void setTime(Instant time) {
        this.time = time;
    }

    public Boolean isShowAnswer() {
        return showAnswer;
    }

    public Question showAnswer(Boolean showAnswer) {
        this.showAnswer = showAnswer;
        return this;
    }

    public void setShowAnswer(Boolean showAnswer) {
        this.showAnswer = showAnswer;
    }

    public Set<Answer> getAnswers() {
        return answers;
    }

    public Question answers(Set<Answer> answers) {
        this.answers = answers;
        return this;
    }

    public Question addAnswers(Answer answer) {
        this.answers.add(answer);
        answer.setQuestion(this);
        return this;
    }

    public Question removeAnswers(Answer answer) {
        this.answers.remove(answer);
        answer.setQuestion(null);
        return this;
    }

    public void setAnswers(Set<Answer> answers) {
        this.answers = answers;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Question)) {
            return false;
        }
        return id != null && id.equals(((Question) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Question{" +
            "id=" + getId() +
            ", text='" + getText() + "'" +
            ", choices='" + getChoices() + "'" +
            ", icon='" + getIcon() + "'" +
            ", answer='" + getAnswer() + "'" +
            ", time='" + getTime() + "'" +
            ", showAnswer='" + isShowAnswer() + "'" +
            "}";
    }
}
