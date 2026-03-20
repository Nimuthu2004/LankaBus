import 'package:flutter/material.dart';

class ProfileScreen extends StatelessWidget {
  const ProfileScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Profile"),
        backgroundColor: const Color(0xFF1E3C72),
      ),
  
  body: Column(
        children: [

          const SizedBox(height: 30),

          const CircleAvatar(
            radius: 60,
            backgroundImage: AssetImage("assets/images/profile.jpg"),
          ),

          const SizedBox(height: 20),

          const Text(
            "John Doe",
            style: TextStyle(
              fontSize: 24,
              fontWeight: FontWeight.bold,
            ),
          ),

          const SizedBox(height: 5),

          const Text(
            "john@email.com",
            style: TextStyle(color: Colors.grey),
          ),

          const SizedBox(height: 30),
  
  
  
  
        ]
  )
  )
  }
  }