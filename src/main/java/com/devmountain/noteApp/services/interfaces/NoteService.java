package com.devmountain.noteApp.services.interfaces;

import java.util.List;
import java.util.Optional;
import com.devmountain.noteApp.dtos.NoteDto;

public interface NoteService {
    
    public void addNote(NoteDto noteDto, Long userId);
    public void deleteNoteById(Long noteId);
    public void updateNoteById(NoteDto noteDto);
    public List<NoteDto> getAllNotesByUserId(Long userId);
    public Optional<NoteDto> getNoteById(Long noteId);
}
