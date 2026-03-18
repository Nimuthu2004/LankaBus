import 'package:flutter/material.dart';

class HistoryScreen extends StatelessWidget {
  const HistoryScreen({super.key});

  @override
  Widget build(BuildContext context) {

    // Sample Trip Data
    final List<Map<String, String>> tripHistory = [
      {
        "route": "Colombo → Galle",
        "seat": "12",
        "fare": "Rs. 350",
        "date": "05 Mar 2026"
      },
      {
        "route": "Colombo → Kandy",
        "seat": "05",
        "fare": "Rs. 280",
        "date": "03 Mar 2026"
      },
      {
        "route": "Negombo → Colombo",
        "seat": "09",
        "fare": "Rs. 150",
        "date": "01 Mar 2026"
      },
    ];