import 'dart:io';
import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import '../widgets/custom_button.dart';
class ConductorRegisterScreen extends StatefulWidget {
  const ConductorRegisterScreen({super.key});

  @override
  State<ConductorRegisterScreen> createState() =>
      _ConductorRegisterScreenState();
}
class _ConductorRegisterScreenState extends State<ConductorRegisterScreen> {
  final _formKey = GlobalKey<FormState>();

  final TextEditingController busRegController = TextEditingController();
  final TextEditingController companyController = TextEditingController();
  final TextEditingController ntcController = TextEditingController();
  final TextEditingController conductorNameController = TextEditingController();
  final TextEditingController driverNameController = TextEditingController();
  final TextEditingController mobileController = TextEditingController();
  final TextEditingController passwordController = TextEditingController();
  final TextEditingController confirmPasswordController = TextEditingController();

  bool agreeTerms = false;
  bool obscurePassword = true;
  bool obscureConfirmPassword = true;
  /// ROUTE DROPDOWN
  String? selectedRoute;

  final List<String> routes = [
    "Colombo - Negombo",
    "Colombo - Kandy",
    "Colombo - Galle",
    "Negombo - Kurunegala",
    "Colombo - Anuradhapura"
  ];
    /// IMAGE PICKER
  File? driverImage;
  final ImagePicker picker = ImagePicker();

  Future<void> pickImage() async {
    final picked = await picker.pickImage(source: ImageSource.gallery);

    if (picked != null) {
      setState(() {
        driverImage = File(picked.path);
      });
    }
  }
   @override
  void dispose() {
    busRegController.dispose();
    companyController.dispose();
    ntcController.dispose();
    conductorNameController.dispose();
    driverNameController.dispose();
    mobileController.dispose();
    passwordController.dispose();
    confirmPasswordController.dispose();
    super.dispose();
  }
   @override
  Widget build(BuildContext context) {

    return Scaffold(
      body: Container(
        padding: const EdgeInsets.all(20),
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            colors: [Color(0xFF1E3C72), Color(0xFF2A5298)],
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
          ),
        ),

        child: SafeArea(
          child: Column(
            children: [

              /// BACK BUTTON
              Align(
                alignment: Alignment.topLeft,
                child: IconButton(
                  icon: const Icon(Icons.arrow_back,color: Colors.white),
                  onPressed: () {
                    Navigator.pop(context);
                  },
                ),
              ),
              Expanded(
                child: SingleChildScrollView(
                  child: Form(
                    key: _formKey,
                    child: Column(
                      children: [

                        const Text(
                          "Conductor Registration",
                          style: TextStyle(
                              color: Colors.white,
                              fontSize: 22,
                              fontWeight: FontWeight.bold),
                        ),

                        const SizedBox(height: 25),

                        /// PHOTO UPLOAD
                        GestureDetector(
                          onTap: pickImage,
                          child: CircleAvatar(
                            radius: 50,
                            backgroundColor: Colors.white,
                            backgroundImage:
                                driverImage != null ? FileImage(driverImage!) : null,
                            child: driverImage == null
                                ? const Icon(Icons.camera_alt,size: 40)
                                : null,
                          ),
                        ),

                        const SizedBox(height: 20),

                        _buildField(busRegController, "Bus Registration Number"),
                        _buildField(companyController, "Company Name"),

                        _buildRouteDropdown(),

                        _buildField(ntcController, "NTC Registration Number"),
                        _buildField(conductorNameController, "Conductor Name"),
                        _buildField(driverNameController, "Driver Name"),

                        _buildField(
                          mobileController,
                          "Mobile Number",
                          keyboardType: TextInputType.phone,
                        ),
                         _buildPasswordField(
                          controller: passwordController,
                          hint: "Password",
                          obscureText: obscurePassword,
                          toggle: () {
                            setState(() {
                              obscurePassword = !obscurePassword;
                            });
                          },
                        ),

                        _buildPasswordField(
                          controller: confirmPasswordController,
                          hint: "Confirm Password",
                          obscureText: obscureConfirmPassword,
                          toggle: () {
                            setState(() {
                              obscureConfirmPassword =
                                  !obscureConfirmPassword;
                            });
                          },
                        ),

                        const SizedBox(height: 10),

                         /// TERMS
                        Row(
                          children: [
                            Checkbox(
                              value: agreeTerms,
                              activeColor: Colors.white,
                              checkColor: Colors.blue,
                              onChanged: (value) {
                                setState(() {
                                  agreeTerms = value!;
                                });
                              },
                            ),
                            const Expanded(
                              child: Text(
                                "I agree to the Terms & Conditions",
                                style: TextStyle(color: Colors.white),
                              ),
                            ),
                          ],
                        ),

                        const SizedBox(height: 10),

                         /// REGISTER BUTTON
                        CustomButton(
                          text: "Register",
                          onPressed: () {

                            if (_formKey.currentState!.validate()) {

                              if (selectedRoute == null) {
                                ScaffoldMessenger.of(context).showSnackBar(
                                  const SnackBar(
                                      content: Text("Please select route")),
                                );
                                return;
                              }

                              if (!agreeTerms) {
                                ScaffoldMessenger.of(context).showSnackBar(
                                  const SnackBar(
                                      content: Text("Please agree to Terms")),
                                );
                                return;
                              }

                              if (passwordController.text !=
                                  confirmPasswordController.text) {
                                ScaffoldMessenger.of(context).showSnackBar(
                                  const SnackBar(
                                      content: Text("Passwords do not match")),
                                );
                                return;
                              }

                              ScaffoldMessenger.of(context).showSnackBar(
                                const SnackBar(
                                    content: Text(
                                        "Conductor Registered Successfully")),
                              );

                              Navigator.pop(context);
                            }
                          },
                        ),

                        const SizedBox(height: 30),
                         ],
                    ),
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
   
   /// TEXT FIELD
  Widget _buildField(TextEditingController controller,String hint,
      {TextInputType keyboardType = TextInputType.text}) {

    return Padding(
      padding: const EdgeInsets.only(bottom: 15),
      child: TextFormField(
        controller: controller,
        keyboardType: keyboardType,
        validator: (value) {
          if (value == null || value.isEmpty) {
            return "Please enter $hint";
          }
          return null;
        },
        decoration: InputDecoration(
          filled: true,
          fillColor: Colors.white,
          hintText: hint,
          border: OutlineInputBorder(
            borderRadius: BorderRadius.circular(12),
          ),
        ),
      ),
    );
  }
