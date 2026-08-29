package com.doctor_booking.ServiceImplementaion;

import com.doctor_booking.Dto.AppointmentRequestDto;
import com.doctor_booking.Dto.AppointmentResponseDto;
import com.doctor_booking.Entity.*;
import com.doctor_booking.Exception.ResourceNotFoundException;
import com.doctor_booking.Repository.AppointmentRepository;
import com.doctor_booking.Repository.DoctorRepository;
import com.doctor_booking.Repository.PatientRepository;
import com.doctor_booking.Repository.TimeSlotRepository;
import com.doctor_booking.Service.AppointmentService;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class AppointmentServiceImpl implements AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final DoctorRepository doctorRepository;
    private final PatientRepository patientRepository;
    private final TimeSlotRepository timeSlotRepository;

    public AppointmentServiceImpl(AppointmentRepository appointmentRepository, DoctorRepository doctorRepository, PatientRepository patientRepository, TimeSlotRepository timeSlotRepository) {
        this.appointmentRepository = appointmentRepository;
        this.doctorRepository = doctorRepository;
        this.patientRepository = patientRepository;
        this.timeSlotRepository = timeSlotRepository;
    }

    @Override
    @Transactional
    public AppointmentResponseDto bookAppointment(
            AppointmentRequestDto request) {

        Doctor doctor = doctorRepository.findById(
                        request.doctorId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Doctor not found"));

        Patient patient = patientRepository.findById(
                        request.patientId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Patient not found"));

        TimeSlot timeSlot = timeSlotRepository.findById(
                        request.timeSlotId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Time slot not found"));

        if (!timeSlot.isAvailable()) {
            throw new IllegalStateException(
                    "Time slot is already booked");
        }

        Appointment appointment = Appointment.builder()
                .doctor(doctor)
                .patient(patient)
                .timeSlot(timeSlot)
                .status(AppointmentStatus.BOOKED)
                .createdAt(LocalDateTime.now())
                .build();

        timeSlot.setAvailable(false);

        timeSlotRepository.save(timeSlot);

        Appointment saved =
                appointmentRepository.save(appointment);

        return mapToResponse(saved);
    }

    @Override
    public AppointmentResponseDto getAppointmentById(
            Long id) {

        Appointment appointment =
                appointmentRepository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Appointment not found"));

        return mapToResponse(appointment);
    }

    @Override
    public List<AppointmentResponseDto> getPatientAppointments(
            Long patientId) {

        return appointmentRepository
                .findByPatientId(patientId)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public List<AppointmentResponseDto> getDoctorAppointments(
            Long doctorId) {

        return appointmentRepository
                .findByDoctorId(doctorId)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    @Transactional
    public AppointmentResponseDto cancelAppointment(
            Long id) {

        Appointment appointment =
                appointmentRepository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Appointment not found"));

        appointment.setStatus(
                AppointmentStatus.CANCELLED);

        TimeSlot timeSlot =
                appointment.getTimeSlot();

        timeSlot.setAvailable(true);

        timeSlotRepository.save(timeSlot);

        Appointment updated =
                appointmentRepository.save(appointment);

        return mapToResponse(updated);
    }

    private AppointmentResponseDto mapToResponse(
            Appointment appointment) {

        return new AppointmentResponseDto(
                appointment.getId(),
                appointment.getDoctor().getId(),
                appointment.getDoctor().getName(),
                appointment.getPatient().getId(),
                appointment.getPatient().getName(),
                appointment.getTimeSlot().getId(),
                appointment.getTimeSlot().getDate(),
                appointment.getStatus(),
                appointment.getCreatedAt()
        );
    }
}
