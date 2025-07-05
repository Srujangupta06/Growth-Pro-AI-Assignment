const validateBody = ({ name, location }) => {
  if (!name || !location) {
    throw new Error("Both name and location are required");
  }

  if (typeof name !== "string" || typeof location !== "string") {
    throw new Error("Both name and location must be strings");
  }

  const trimmedName = name.trim();
  
  const trimmedLocation = location.trim();

  if (trimmedName.length === 0 || trimmedLocation.length === 0) {
    throw new Error("Name and location cannot be empty");
  }

  if (trimmedName.length < 3) {
    throw new Error("Name must be at least 3 characters long");
  }

  if (trimmedLocation.length < 3) {
    throw new Error("Location must be at least 3 characters long");
  }
};

module.exports = { validateBody };
