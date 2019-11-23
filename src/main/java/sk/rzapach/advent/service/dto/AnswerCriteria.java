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
 * Criteria class for the {@link sk.rzapach.advent.domain.Answer} entity. This class is used
 * in {@link sk.rzapach.advent.web.rest.AnswerResource} to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /answers?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
public class AnswerCriteria implements Serializable, Criteria {

    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private StringFilter text;

    private InstantFilter time;

    private BooleanFilter isCorrect;

    private IntegerFilter points;

    private LongFilter questionId;

    private LongFilter userId;

    public AnswerCriteria(){
    }

    public AnswerCriteria(AnswerCriteria other){
        this.id = other.id == null ? null : other.id.copy();
        this.text = other.text == null ? null : other.text.copy();
        this.time = other.time == null ? null : other.time.copy();
        this.isCorrect = other.isCorrect == null ? null : other.isCorrect.copy();
        this.points = other.points == null ? null : other.points.copy();
        this.questionId = other.questionId == null ? null : other.questionId.copy();
        this.userId = other.userId == null ? null : other.userId.copy();
    }

    @Override
    public AnswerCriteria copy() {
        return new AnswerCriteria(this);
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

    public InstantFilter getTime() {
        return time;
    }

    public void setTime(InstantFilter time) {
        this.time = time;
    }

    public BooleanFilter getIsCorrect() {
        return isCorrect;
    }

    public void setIsCorrect(BooleanFilter isCorrect) {
        this.isCorrect = isCorrect;
    }

    public IntegerFilter getPoints() {
        return points;
    }

    public void setPoints(IntegerFilter points) {
        this.points = points;
    }

    public LongFilter getQuestionId() {
        return questionId;
    }

    public void setQuestionId(LongFilter questionId) {
        this.questionId = questionId;
    }

    public LongFilter getUserId() {
        return userId;
    }

    public void setUserId(LongFilter userId) {
        this.userId = userId;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        final AnswerCriteria that = (AnswerCriteria) o;
        return
            Objects.equals(id, that.id) &&
            Objects.equals(text, that.text) &&
            Objects.equals(time, that.time) &&
            Objects.equals(isCorrect, that.isCorrect) &&
            Objects.equals(points, that.points) &&
            Objects.equals(questionId, that.questionId) &&
            Objects.equals(userId, that.userId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(
        id,
        text,
        time,
        isCorrect,
        points,
        questionId,
        userId
        );
    }

    @Override
    public String toString() {
        return "AnswerCriteria{" +
                (id != null ? "id=" + id + ", " : "") +
                (text != null ? "text=" + text + ", " : "") +
                (time != null ? "time=" + time + ", " : "") +
                (isCorrect != null ? "isCorrect=" + isCorrect + ", " : "") +
                (points != null ? "points=" + points + ", " : "") +
                (questionId != null ? "questionId=" + questionId + ", " : "") +
                (userId != null ? "userId=" + userId + ", " : "") +
            "}";
    }

}
