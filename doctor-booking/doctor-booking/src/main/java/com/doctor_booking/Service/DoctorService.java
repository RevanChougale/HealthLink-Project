package com.doctor_booking.Service;

import com.doctor_booking.Dto.DoctorRequestDto;
import com.doctor_booking.Dto.DoctorResponseDto;
import org.springframework.stereotype.Service;

import java.util.List;


public interface DoctorService {
    DoctorResponseDto createDoctor(DoctorRequestDto request);

    DoctorResponseDto getDoctorById(Long id);

    List<DoctorResponseDto> getAllDoctors();

    List<DoctorResponseDto> searchDoctors(String city, String specialization);

    DoctorResponseDto updateDoctor(Long id, DoctorRequestDto request);

    void deleteDoctor(Long id);

}
