import 'package:flutter/material.dart';

class ConductorProfileScreen extends StatelessWidget {
  const ConductorProfileScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Conductor Profile"),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [

            const CircleAvatar(
              radius: 50,
              backgroundImage: AssetImage("assets/conductor.jpg"),
            ),

            const SizedBox(height: 20),

            const Text(
              "Nimal Perera",
              style: TextStyle(
                fontSize: 22,
                fontWeight: FontWeight.bold,
              ),
            ),

            const SizedBox(height: 10),

            const Text("Bus Number: ND-1030"),

            const SizedBox(height: 10),

            const Text("Route: Colombo - Negombo"),

            const SizedBox(height: 30),

            ElevatedButton(
              onPressed: () {
                Navigator.pop(context);
              },
              child: const Text("Back"),
            )

          ],
        ),
      ),
    );
  }
}