import 'package:flutter/material.dart';
import 'scan_qr_screen.dart';
import 'seat_update_screen.dart';
import 'summary_screen.dart';

import 'conductor_chatbot_screen.dart';
import 'conductor_settings_screen.dart';
import 'conductor_profile_screen.dart';
class ConductorHomeScreen extends StatefulWidget {
  const ConductorHomeScreen({super.key});

  @override
  State<ConductorHomeScreen> createState() => _ConductorHomeScreenState();
}

class _ConductorHomeScreenState extends State<ConductorHomeScreen> {

  int passengerCount = 0;

  void increasePassenger() {
    setState(() {
      passengerCount++;
    });
  }