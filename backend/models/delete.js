// DELETE: Delete an employee by ID
app.delete('/delete-employee/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const employee = await EmployeeList.findByIdAndDelete(id);
      if (!employee) {
        return res.status(404).json({ message: 'Employee not found' });
      }
      res.status(200).json({ message: 'Employee deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting employee', error });
    }
  });
  