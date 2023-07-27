package com.devmountain.noteApp.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.devmountain.noteApp.dtos.UserDto;
import com.devmountain.noteApp.entities.User;
import com.devmountain.noteApp.repositories.UserRepository;
import com.devmountain.noteApp.services.interfaces.UserService;

import jakarta.transaction.Transactional;

@Service
public class UserServiceImpl implements UserService{
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public List<String> addUser(UserDto userDto){
        List<String> res = new ArrayList<>();
        User user = new User(userDto);
        userRepository.saveAndFlush(user);
        res.add("http://127.0.0.1:8080/login.html");

        return res;    
    }

    @Override
    public List<String> userLogin(UserDto userDto){
        List<String> res = new ArrayList<>();
        Optional<User> userOptional = userRepository.findByUsername(userDto.getUsername());
        if (userOptional.isPresent()){
            if (passwordEncoder.matches(userDto.getPassword(), userOptional.get().getPassword())){
                res.add("http://127.0.0.1:8080/home.html");
                res.add(String.valueOf(userOptional.get().getId()));
            }
            else{
                res.add("Username or Password incorrect");
            }
        }
        else{
            res.add("Username or Password incorrect");
        }

        return res;
    }
}
