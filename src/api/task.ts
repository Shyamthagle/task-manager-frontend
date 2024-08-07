import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface TaskData {
    title: string;
    description: string;
    completed: boolean;
    
}

export const createTask = async (taskData: TaskData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/task`, taskData);
    return response.data;
  } catch (error: any) {
    console.error('Create task error:', error);
    throw new Error(error.response?.data?.message || 'Create task failed');
  }
};

export const updateTask = async (taskId: string, taskData: TaskData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/task/${taskId}`, taskData);
    return response.data;
  } catch (error: any) {
    console.error('Update task error:', error);
    throw new Error(error.response?.data?.message || 'Update task failed');
  }
};
    
export const getTasks = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/task`);
    return response.data;
  } catch (error: any) {
    console.error('Get tasks error:', error);
    throw new Error(error.response?.data?.message || 'Get tasks failed');
  }
};

export const deleteTask = async (id: string) => {
    try {
      await axios.delete(`${API_BASE_URL}/task/${id}`);
    } catch (error:any) {
      console.error('Delete task error:', error);
      throw new Error(error.response?.data?.message || 'Delete task failed');
    }
  };
