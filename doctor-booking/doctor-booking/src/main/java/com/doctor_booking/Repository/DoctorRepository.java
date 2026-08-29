package com.doctor_booking.Repository;

import com.doctor_booking.Entity.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DoctorRepository extends JpaRepository <Doctor, Long >{

    List<Doctor> findByCityIgnoreCase(String city);

    List<Doctor> findBySpecializationNameIgnoreCase(String specializationName);

    List<Doctor> findByCityIgnoreCaseAndSpecializationNameIgnoreCase(
            String city,
            String specializationName
    );

}
