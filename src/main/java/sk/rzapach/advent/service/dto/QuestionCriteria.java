package sk.rzapach.advent.service.dto;

import java.io.Serializable;
import java.util.Objects;
import io.github.jhipster.service.Criteria;
import io.github.jhipster.service.filter.BooleanFilter;
import io.github.jhipster.service.filter.DoubleFilter;
import io.github.jhipster.service.filter.Filter;
import io.github.jhipster.service.filter.FloatFilter;
import io.github.jhipster.service.filter.IntegerFilter;
import io.github.jhipster.service.filter.LongFilter;
import io.github.jhipster.service.filter.StringFilter;
import io.github.jhipster.service.filter.InstantFilter;

/**
 * Criteria class for the {@link sk.rzapach.advent.domain.Question} entity. This class is used
 * in {@link sk.rzapach.advent.web.rest.QuestionResource} to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /questions?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
public class QuestionCriteria implements Serializable, Criteria {

    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private StringFilter text;

    private StringFilter choices;

    private StringFilter icon;

    private StringFilter answer;

    private InstantFilter time;

    private LongFilter answersId;

    public QuestionCriteria(){
    }

    public QuestionCriteria(QuestionCriteria other){
        this.id = other.id == null ? null : other.id.copy();
        this.text = other.text == null ? null : other.text.copy();
        this.choices = other.choices == null ? null : other.choices.copy();
        this.icon = other.icon == null ? null : other.icon.copy();
        this.answer = other.answer == null ? null : other.answer.copy();
        this.time = other.time == null ? null : other.time.copy();
        this.answersId = other.answersId == null ? null : other.answersId.copy();
    }

    @Override
    public QuestionCriteria copy() {
        return new QuestionCriteria(this);
    }

    public LongFilter getId() {
        return id;
    }

    public void setId(LongFilter id) {
        this.id = id;
    }

    public StringFilter getText() {
        return text;
    }

    public void setText(StringFilter text) {
        this.text = text;
    }

    public StringFilter getChoices() {
        return choices;
    }

    public void setChoices(StringFilter choices) {
        this.choices = choices;
    }

    public StringFilter getIcon() {
        return icon;
    }

    public void setIcon(StringFilter icon) {
        this.icon = icon;
    }

    public StringFilter getAnswer() {
        return answer;
    }

    public void setAnswer(StringFilter answer) {
        this.answer = answer;
    }

    public InstantFilter getTime() {
        return time;
    }

    public void setTime(InstantFilter time) {
        this.time = time;
    }

    public LongFilter getAnswersId() {
        return answersId;
    }

    public void setAnswersId(LongFilter answersId) {
        this.answersId = answersId;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        final QuestionCriteria that = (QuestionCriteria) o;
        return
            Objects.equals(id, that.id) &&
            Objects.equals(text, that.text) &&
            Objects.equals(choices, that.choices) &&
            Objects.equals(icon, that.icon) &&
            Objects.equals(answer, that.answer) &&
            Objects.equals(time, that.time) &&
            Objects.equals(answersId, that.answersId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(
        id,
        text,
        choices,
        icon,
        answer,
        time,
        answersId
        );
    }

    @Override
    public String toString() {
        return "QuestionCriteria{" +
                (id != null ? "id=" + id + ", " : "") +
                (text != null ? "text=" + text + ", " : "") +
                (choices != null ? "choices=" + choices + ", " : "") +
                (icon != null ? "icon=" + icon + ", " : "") +
                (answer != null ? "answer=" + answer + ", " : "") +
                (time != null ? "time=" + time + ", " : "") +
                (answersId != null ? "answersId=" + answersId + ", " : "") +
            "}";
    }

}
