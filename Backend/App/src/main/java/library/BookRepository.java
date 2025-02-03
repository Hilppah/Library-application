package library;


import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface BookRepository extends MongoRepository<LibraryBook, String> {
    Optional<LibraryBook> findByIdAndAvailableTrue(String id);
}