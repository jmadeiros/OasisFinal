import { app } from './config';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';

// Initialize Firestore
const db = getFirestore(app);

// Add detailed logging
console.log('Firestore initialized with app:', app.options);

/**
 * Return type for Firestore operations
 */
export interface FirestoreResult {
  success: boolean;
  id?: string;
  error?: any;
}

/**
 * Save an enquiry to Firestore
 * @param {Object} data - The form data to save
 * @returns {Promise<FirestoreResult>} - The document reference
 */
export const saveEnquiry = async (data: any): Promise<FirestoreResult> => {
  console.log('Attempting to save enquiry to Firestore:', { 
    data: data,
    collection: 'enquiries',
    appConfig: app.options
  });
  
  try {
    const docRef = await addDoc(collection(db, 'enquiries'), {
      ...data,
      createdAt: serverTimestamp(),
    });
    
    console.log('Successfully saved enquiry:', docRef.id);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error adding enquiry document:', error);
    // More detailed error information
    if (error instanceof Error) {
      console.error('Error name:', error.name);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    return { success: false, error };
  }
};

/**
 * Save a contact form submission to Firestore
 * @param {Object} data - The form data to save
 * @returns {Promise<FirestoreResult>} - The document reference
 */
export const saveContactMessage = async (data: any): Promise<FirestoreResult> => {
  console.log('Attempting to save contact message to Firestore:', { 
    data: data,
    collection: 'contactMessages',
    appConfig: app.options
  });
  
  try {
    const docRef = await addDoc(collection(db, 'contactMessages'), {
      ...data,
      createdAt: serverTimestamp(),
    });
    
    console.log('Successfully saved contact message:', docRef.id);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error adding contact message document:', error);
    // More detailed error information
    if (error instanceof Error) {
      console.error('Error name:', error.name);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    return { success: false, error };
  }
}; 