package com.example.user.service;

import com.example.security.oauth.model.CustomOAuth2User;
import com.example.user.exception.UserAlreadyRegisteredException;
import com.example.user.model.Provider;
import com.example.user.model.Role;
import com.example.user.model.User;
import com.example.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public User processOAuthPostLogin(CustomOAuth2User oAuth2User) {

        Optional<User> foundUser = userRepository.findByEmail(oAuth2User.getEmail());

        if (foundUser.isPresent()) {
            User existingUser = foundUser.get();
            if (existingUser.getProvider() == Provider.GOOGLE) {
                return existingUser;
            }
            throw new UserAlreadyRegisteredException(existingUser.getEmail());
        }

        User user = User.builder()
                .firstName(oAuth2User.getAttribute("given_name"))
                .lastName(oAuth2User.getAttribute("family_name"))
                .email(oAuth2User.getEmail())
                .provider(Provider.GOOGLE)
                .role(Role.USER)
                .build();

        return userRepository.save(user);
    }
}