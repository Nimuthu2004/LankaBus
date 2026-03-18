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

        return Scaffold(
      appBar: AppBar(
        title: const Text("Trip History"),
        backgroundColor: const Color(0xFF1E3C72),
      ),

      body: Container(
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            colors: [
              Color(0xFF1E3C72),
              Color(0xFF2A5298),
            ],
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
          ),
        ),

        child: ListView.builder(
          padding: const EdgeInsets.all(16),
          itemCount: tripHistory.length,
          itemBuilder: (context, index) {
            final trip = tripHistory[index];