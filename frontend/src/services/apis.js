import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  orderBy,
  limit,
  startAfter,
  getDoc,
  doc,
} from "firebase/firestore";
import { db } from "../config/Firebase";
import axios from "axios";
import { dummyCarData } from "../constants/data";
import { BACKEND_URL } from "../constants/urls";

export const signUp = async (data) => {
  try {
    const q = query(
      collection(db, "users"),
      where("email", "==", data.email),
      where("phoneNumber", "==", data.phoneNumber)
    );
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      return { success: false, message: "User already exists" };
    }

    const docRef = await addDoc(collection(db, "users"), data);
    return {
      success: true,
      message: "User signed in successfully",
      userId: docRef.id,
    };
  } catch (error) {
    return { success: false, message: "Error while signing up", error };
  }
};

export const login = async (data) => {
  try {
    const { email, password } = data;

    if (!email || !password) {
      return { success: false, message: "All fields are required" };
    }

    const q = query(collection(db, "users"), where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return { success: false, message: "Incorrect password or email" };
    }

    const userDoc = querySnapshot.docs[0];
    const user = userDoc.data();

    return { success: true, message: "User logged in successfully", user };
  } catch (error) {
    return { success: false, message: "Error during login", error };
  }
};

export const uploadToCloudinary = async (images) => {
  try {
    let resp = await axios.post(`${BACKEND_URL}/api/v1/user/image/upload`, {
      images,
    });
    return resp;
  } catch (error) {
    console.error("Error uploading to Cloudinary", error);
    return null;
  }
};

export const addCar = async (carData) => {
  try {
    const { images, name, year, location, userId } = carData;

    if (!images || images.length === 0) {
      return { success: false, message: "Please select at least one image" };
    }

    const q = query(collection(db, "users"), where("email", "==", userId));
    const querySnapshot = await getDocs(q);
    const documentId = querySnapshot.docs[0].id;

    carData.userId = documentId;

    let uploadedImages = [];
    const imageUrl = await uploadToCloudinary(images);

    if (imageUrl && imageUrl.data.length > 0) {
      uploadedImages = imageUrl.data;
    }

    const result = await addDoc(collection(db, "cars"), carData);

    return { success: true, message: "Car added successfully" };
  } catch (error) {
    console.error("Error adding car to Firestore", error);
    return { success: false, message: "Failed to add car" };
  }
};

export const addDummyCars = async () => {
  try {
    const carDataArray = dummyCarData;
    const promises = carDataArray.map(async (carData) => {
      const docRef = await addDoc(collection(db, "cars"), carData);
      return docRef.id;
    });

    const carIds = await Promise.all(promises);

    return {
      success: true,
      message: "Cars added successfully",
      carIds,
    };
  } catch (error) {
    return {
      success: false,
      message: "Error while adding cars",
      error,
    };
  }
};

export const getAllCars = async (filters, pagination) => {
  try {
    const carsCollection = collection(db, "cars");
    let q = query(carsCollection);

    if (filters) {
      Object.keys(filters).forEach((key) => {
        q = query(q, where(key, "==", filters[key]));
      });
    }

    if (pagination) {
      const { pageSize, lastDoc } = pagination;
      if (pageSize) q = query(q, limit(pageSize));
      if (lastDoc) q = query(q, startAfter(lastDoc));
    }

    const querySnapshot = await getDocs(q);
    const cars = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return cars;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getCarDetails = async (id) => {
  try {
    const carDoc = doc(db, "cars", id);
    const carSnapshot = await getDoc(carDoc);

    if (carSnapshot.exists()) {
      return { id: carSnapshot.id, ...carSnapshot.data() };
    } else {
      throw new Error("Car not found");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getDealerProfile = async (userId) => {
  try {
    const userQuery = query(
      collection(db, "users"),
      where("__name__", "==", userId)
    );
    const userSnapshot = await getDocs(userQuery);

    if (userSnapshot.empty) {
      return { success: false, message: "User not found" };
    }

    const user = userSnapshot.docs[0].data();

    const carsQuery = query(
      collection(db, "cars"),
      where("userId", "==", userId)
    );
    const carsSnapshot = await getDocs(carsQuery);

    const cars = carsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return { success: true, user: { ...user, cars } };
  } catch (error) {
    return { success: false, message: "Failed to fetch dealer profile", error };
  }
};

export const getCarsByIds = async (ids) => {
  try {
    const carPromises = ids.map(async (id) => {
      const carDoc = doc(db, "cars", id);
      const carSnapshot = await getDoc(carDoc);
      if (carSnapshot.exists()) {
        return { id: carSnapshot.id, ...carSnapshot.data() };
      }
    });
    const cars = await Promise.all(carPromises);
    return cars.filter((car) => car !== undefined);
  } catch (error) {
    throw new Error(error.message);
  }
};
