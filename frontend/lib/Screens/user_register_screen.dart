import 'package:flutter/material.dart';
import '../widgets/custom_button.dart';
import '../widgets/custom_textfield.dart';
import 'splash_screen.dart';

class UserRegisterScreen extends StatelessWidget {
  const UserRegisterScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: gradientBackground(
        child: Padding(
          padding: const EdgeInsets.all(20),
          child: ListView(
            children: const [
              CustomTextField(hint: "First Name"),
              CustomTextField(hint: "Last Name"),
              CustomTextField(hint: "Phone Number"),
              CustomTextField(hint: "E-mail"),
              CustomTextField(hint: "Password", obscure: true),
              SizedBox(height: 20),
            ],
          ),
        ),
      ),
      floatingActionButton: CustomButton(
        text: "Register",
        onPressed: () {
          Navigator.pop(context);
        },
      ),
      floatingActionButtonLocation: FloatingActionButtonLocation.centerFloat,
    );
  }
}