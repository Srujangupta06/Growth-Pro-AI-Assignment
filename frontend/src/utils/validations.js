const validateBody = ({ name, location }) => {
  if (!name || !location) {
    throw new Error("Both name and location are required");
  }

  const trimmedName = name.trim();
  const trimmedLocation = location.trim();

  if (trimmedName.length < 3) {
    throw new Error("Name must be at least 3 characters long");
  }

  if (trimmedLocation.length < 3) {
    throw new Error("Location must be at least 3 characters long");
  }
};

export default validateBody;
