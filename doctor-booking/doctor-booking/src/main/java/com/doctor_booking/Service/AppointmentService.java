package com.doctor_booking.Service;

import com.doctor_booking.Dto.AppointmentRequestDto;
import com.doctor_booking.Dto.AppointmentResponseDto;
import jakarta.transaction.Transactional;

import java.util.List;

public interface AppointmentService {
    @Transactional
    AppointmentResponseDto bookAppointment(
            AppointmentRequestDto request);

    AppointmentResponseDto getAppointmentById(Long id);

    List<AppointmentResponseDto> getPatientAppointments(
            Long patientId);

    List<AppointmentResponseDto> getDoctorAppointments(
            Long doctorId);

    AppointmentResponseDto cancelAppointment(Long id);
}
