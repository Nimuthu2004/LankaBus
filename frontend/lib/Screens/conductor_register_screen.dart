import 'package:flutter/material.dart';
import '../widgets/custom_button.dart';
import '../widgets/custom_textfield.dart';

class ConductorRegisterScreen extends StatelessWidget {
  const ConductorRegisterScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: gradientBackground(
        child: Padding(
          padding: const EdgeInsets.all(20),
          child: ListView(
            children: const [
              CustomTextField(hint: "Bus Registration Number"),
              CustomTextField(hint: "Company Name"),
              CustomTextField(hint: "Route"),
              CustomTextField(hint: "NTC Registration Number"),
              CustomTextField(hint: "Conductor Full Name"),
              CustomTextField(hint: "Driver Full Name"),
              SizedBox(height: 20),
            ],
          ),
        ),
      ),
      floatingActionButton: CustomButton(
        text: "Submit",
        onPressed: () {
          // TODO: Implement the submit functionality
          print("Submit button pressed");
        },
      ),
      floatingActionButtonLocation: FloatingActionButtonLocation.centerFloat,
    );
  }
}