// PUT: Update an employee by ID
app.put('/update-employee/:id', upload.single('photo'), async (req, res) => {
    const { id } = req.params;
    const { name, email, mobileNo, designation, gender, courses } = req.body;
    const photo = req.file ? req.file.filename : null;
  
    try {
      const updateData = {
        name,
        email,
        mobileNo,
        designation,
        gender,
        courses: JSON.parse(courses),
      };
  
      if (photo) {
        updateData.photo = photo;
      }
  
      const employee = await EmployeeList.findByIdAndUpdate(id, updateData, { new: true });
  
      if (!employee) {
        return res.status(404).json({ message: 'Employee not found' });
      }
  
      res.status(200).json({
        message: 'Employee updated successfully!',
        employee,
      });
    } catch (error) {
      res.status(500).json({ message: 'Error updating employee', error });
    }
  });
  