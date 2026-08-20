package com.travel_journal.service;


import com.travel_journal.model.Journal;
import com.travel_journal.model.User;
import com.travel_journal.repo.journalRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JournalService {

    @Autowired
    private journalRepo repo;


    public Journal addJournal(Journal journal) {
        return repo.save(journal);
    }

    public List<Journal> getJournal() {
        return repo.findAll();
    }

    public void deleteJournal(int id) {
        repo.deleteById(id);
    }

    public void updateJob(Journal journal) {
        repo.save(journal);
    }

    public Journal getJournalById(int id) {
        return repo.getJournalById(id);
    }

    public List<Journal> getJournalsByUser(User user) {
        return repo.findByUser(user);
    }
}
