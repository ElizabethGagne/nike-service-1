package <%=packageName%>.entity;

import java.io.Serializable;
<%_ if (fieldsContainBigDecimal == true) { _%>
import java.math.BigDecimal;
<%_ } _%>
<%_ if (fieldsContainDateTime == true) { _%>
import java.time.LocalDate;
<% _} %>

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.Data;
/* kar-boot-add-page-packages */

/**
 * A <%= entityClass %>.
 */
@Entity
@Data
public class <%= entityClass %>Entity implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    <% for (fieldId in fields) { %>
	    private <%= fields[fieldId].fieldType %> <%= fields[fieldId].fieldName %>;
	<% } %>

	/* kar-boot-find-by-needle */
}
