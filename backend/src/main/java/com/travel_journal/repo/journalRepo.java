package com.travel_journal.repo;

import com.travel_journal.model.Journal;
import com.travel_journal.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface journalRepo extends JpaRepository<Journal,Integer> {

     List<Journal> findByUser(User user) ;

    Journal getJournalById(int id);
}
