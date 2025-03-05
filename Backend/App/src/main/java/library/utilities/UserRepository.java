package library.utilities;


import library.collections.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {
    Optional<User> findUserById(String id);

    List<User> findAll();

    User findByEmail(String email);
}