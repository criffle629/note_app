package com.devmountain.noteApp.services.interfaces;

import java.util.List;
import com.devmountain.noteApp.dtos.UserDto;

public interface UserService {
    public List<String> addUser(UserDto userDto);
    public List<String> userLogin(UserDto userDto);
}
