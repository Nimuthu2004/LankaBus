import 'package:flutter/material.dart';

class UserRegisterScreen extends StatefulWidget {
  const UserRegisterScreen({super.key});

  @override
  State<UserRegisterScreen> createState() => _UserRegisterScreenState();
}

class _UserRegisterScreenState extends State<UserRegisterScreen> {

  final _formKey = GlobalKey<FormState>();

  final TextEditingController fullNameController = TextEditingController();
  final TextEditingController lastNameController = TextEditingController();
  final TextEditingController phoneController = TextEditingController();
  final TextEditingController emailController = TextEditingController();
  final TextEditingController passwordController = TextEditingController();
  final TextEditingController confirmPasswordController = TextEditingController();

  bool agreeTerms = false;
  bool obscurePassword = true;
  bool obscureConfirmPassword = true;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("User Register"),
        backgroundColor: Colors.blue,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(20),
        child: Form(
          key: _formKey,
          child: Column(
            children: [

                /// Full Name
              _buildTextField(
                controller: fullNameController,
                label: "Full Name",
                icon: Icons.person,
              ),

              const SizedBox(height: 15),

              /// Last Name
              _buildTextField(
                controller: lastNameController,
                label: "Last Name",
                icon: Icons.person_outline,
              ),

              const SizedBox(height: 15),

              /// Phone Number
              _buildTextField(
                controller: phoneController,
                label: "Phone Number",
                icon: Icons.phone,
                keyboardType: TextInputType.phone,
              ),

              const SizedBox(height: 15),

              /// Email
              _buildTextField(
                controller: emailController,
                label: "Email",
                icon: Icons.email,
                keyboardType: TextInputType.emailAddress,
              ),

              const SizedBox(height: 15),

              /// Password
              _buildTextField(
                controller: passwordController,
                label: "Password",
                icon: Icons.lock,
                isPassword: true,
                obscureText: obscurePassword,
                togglePassword: () {
                  setState(() {
                    obscurePassword = !obscurePassword;
                  });
                },
              ),

              const SizedBox(height: 15),

              /// Confirm Password
              _buildTextField(
                controller: confirmPasswordController,
                label: "Confirm Password",
                icon: Icons.lock_outline,
                isPassword: true,
                obscureText: obscureConfirmPassword,
                togglePassword: () {
                  setState(() {
                    obscureConfirmPassword = !obscureConfirmPassword;
                  });
                },
              ),

              const SizedBox(height: 20),

              /// Terms & Conditions
              Row(
                children: [
                  Checkbox(
                    value: agreeTerms,
                    onChanged: (value) {
                      setState(() {
                        agreeTerms = value!;
                      });
                    },
                  ),
                  const Expanded(
                    child: Text(
                      "I agree to the Terms & Conditions",
                      style: TextStyle(fontSize: 14),
                    ),
                  )
                ],
              ),

              const SizedBox(height: 20),