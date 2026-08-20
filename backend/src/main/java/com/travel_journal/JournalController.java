package com.travel_journal;


import com.travel_journal.auth.JwtUtil;
import com.travel_journal.model.Journal;
import com.travel_journal.model.User;
import com.travel_journal.repo.UserRepo;
import com.travel_journal.service.JournalService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RequestMapping("/api")
public class JournalController {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserRepo userRepository;
    @Autowired
    private JournalService service;
    private static final Logger logger = LoggerFactory.getLogger(JournalController.class);

    @PostMapping("/journal")
    public ResponseEntity<?> addJournal(@RequestBody Journal journal, HttpServletRequest request) {
        String token = request.getHeader("Authorization").substring(7);
        String email = jwtUtil.extractUsername(token);
        User user = userRepository.findByEmail(email).orElseThrow();

        journal.setUser(user);
        Journal saved = service.addJournal(journal);
        return new ResponseEntity<>(saved, HttpStatus.OK);
    }

    @GetMapping("/journal")
    public List<Journal> getUserJournals(HttpServletRequest request) {
        String token = request.getHeader("Authorization").substring(7);
        String email = jwtUtil.extractUsername(token);
        User user = userRepository.findByEmail(email).orElseThrow();

        return service.getJournalsByUser(user);
    }


    @GetMapping("/journal/{id}")
    public ResponseEntity<Journal> getJournalById(@PathVariable("id") int id){
        Journal journal=service.getJournalById(id);
        return new ResponseEntity<>(journal,HttpStatus.OK);
    }
    @PutMapping("/journal/{id}")
    public ResponseEntity<?> updateJournal(@PathVariable("id") int id, @RequestBody Journal journalDetails, HttpServletRequest request) {
        try {
            String token = request.getHeader("Authorization").substring(7);
            String email = jwtUtil.extractUsername(token);
            User user = userRepository.findByEmail(email).orElseThrow();

            Optional<Journal> optionalJournal = Optional.ofNullable(service.getJournalById(id));

            if (optionalJournal.isPresent()) {
                Journal journal = optionalJournal.get();

                // Check if journal belongs to logged-in user
                if (journal.getUser().getId() != user.getId()) {
                    return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You can only update your own journal entries.");
                }

                // Update fields
                journal.setTitle(journalDetails.getTitle());
                journal.setCountry(journalDetails.getCountry());
                journal.setMapLink(journalDetails.getMapLink());
                journal.setFromDate(journalDetails.getFromDate());
                journal.setToDate(journalDetails.getToDate());
                journal.setText(journalDetails.getText());

                service.addJournal(journal);

                return ResponseEntity.ok(journal);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Journal not found with ID: " + id);
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating journal: " + e.getMessage());
        }
    }
    @DeleteMapping("/journal/{id}")
    public ResponseEntity<?> deleteJournal(@PathVariable("id") int id, HttpServletRequest request) {
        try {
            String token = request.getHeader("Authorization").substring(7);
            String email = jwtUtil.extractUsername(token);
            User user = userRepository.findByEmail(email).orElseThrow();

            Journal journal = service.getJournalById(id);

            if (journal.getUser() == null || journal.getUser().getId() != user.getId()) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Unauthorized");
            }

            service.deleteJournal(id);
            return ResponseEntity.ok("Journal deleted successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting journal: " + e.getMessage());
        }
    }
}