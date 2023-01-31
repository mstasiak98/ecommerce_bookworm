package com.bookworm.ecommerce.dao;

import com.bookworm.ecommerce.entity.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.security.access.prepost.PreAuthorize;

import java.util.Date;
import java.util.List;
import java.util.Map;

@RepositoryRestResource
public interface OrderRepository extends JpaRepository<Order, Long> {

    @PreAuthorize("isAuthenticated() and #email == authentication.principal.email")
    Page<Order> findByCustomerEmail(@Param("email") String email, Pageable pageable);

    List<Order> findAllByStatusIn(@Param("status") int[] status);

    List<Order> findAllByDateCreatedBetween(Date start, Date end);

    @Query(value = "Select EXTRACT(MONTH FROM date(date_created)) as month, count(*) as orders from orders where year(date_created) = year(curdate()) group by month", nativeQuery = true)
    List<OrdersStats> getMonthlyOrdersCount();

    @Query(value = "SELECT category_name, COUNT(*) as orders from orders inner join order_item oi on orders.id = oi.order_id inner join book b on b.id = oi.book_id inner join category c on c.id = b.category_id group by category_name limit 3", nativeQuery = true)
    List<Map<String, Integer>> getTop3SellingCategories();

}
