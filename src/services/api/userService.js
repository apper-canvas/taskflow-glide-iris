const { ApperClient } = window.ApperSDK;

const apperClient = new ApperClient({
  apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
  apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
});

const userService = {
  async getAll() {
    try {
      const params = {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "Name"}},
          {"field": {"Name": "name_c"}},
          {"field": {"Name": "email_c"}},
          {"field": {"Name": "role_c"}},
          {"field": {"Name": "avatar_c"}},
          {"field": {"Name": "created_at_c"}}
        ]
      };
      
      const response = await apperClient.fetchRecords('user_c', params);
      
      if (!response?.success) {
        console.error(response?.message || 'Failed to fetch users');
        return [];
      }
      
      return response.data || [];
    } catch (error) {
      console.error("Error fetching users:", error?.response?.data?.message || error);
      return [];
    }
  },

  async getById(id) {
    try {
      const params = {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "Name"}},
          {"field": {"Name": "name_c"}},
          {"field": {"Name": "email_c"}},
          {"field": {"Name": "role_c"}},
          {"field": {"Name": "avatar_c"}},
          {"field": {"Name": "created_at_c"}}
        ]
      };
      
      const response = await apperClient.getRecordById('user_c', parseInt(id), params);
      
      if (!response?.success) {
        console.error(response?.message || 'User not found');
        throw new Error("User not found");
      }
      
      return response.data;
    } catch (error) {
      console.error(`Error fetching user ${id}:`, error?.response?.data?.message || error);
      throw new Error("User not found");
    }
  },

  async getByRole(role) {
    try {
      const params = {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "Name"}},
          {"field": {"Name": "name_c"}},
          {"field": {"Name": "email_c"}},
          {"field": {"Name": "role_c"}},
          {"field": {"Name": "avatar_c"}},
          {"field": {"Name": "created_at_c"}}
        ],
        where: [
          {"FieldName": "role_c", "Operator": "EqualTo", "Values": [role]}
        ]
      };
      
      const response = await apperClient.fetchRecords('user_c', params);
      
      if (!response?.success) {
        console.error(response?.message || 'Failed to fetch users by role');
        return [];
      }
      
      return response.data || [];
    } catch (error) {
      console.error("Error fetching users by role:", error?.response?.data?.message || error);
      return [];
    }
  },

  async create(userData) {
    try {
      const params = {
        records: [
          {
            Name: userData.name_c || userData.name,
            name_c: userData.name_c || userData.name,
            email_c: userData.email_c || userData.email,
            role_c: userData.role_c || userData.role || "member",
            avatar_c: userData.avatar_c || userData.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${userData.name_c || userData.name}`,
            created_at_c: new Date().toISOString()
          }
        ]
      };
      
      const response = await apperClient.createRecord('user_c', params);
      
      if (!response?.success) {
        console.error(response?.message || 'Failed to create user');
        throw new Error(response?.message || "Failed to create user");
      }
      
      if (response.results && response.results.length > 0) {
        const result = response.results[0];
        if (!result.success) {
          throw new Error(result.message || "Failed to create user");
        }
        return result.data;
      }
      
      throw new Error("Failed to create user");
    } catch (error) {
      console.error("Error creating user:", error?.response?.data?.message || error);
      throw error;
    }
  },

  async update(id, userData) {
    try {
      const updateData = {
        Id: parseInt(id)
      };
      
      if (userData.name_c || userData.name) updateData.name_c = userData.name_c || userData.name;
      if (userData.Name) updateData.Name = userData.Name;
      if (userData.email_c || userData.email) updateData.email_c = userData.email_c || userData.email;
      if (userData.role_c || userData.role) updateData.role_c = userData.role_c || userData.role;
      if (userData.avatar_c || userData.avatar) updateData.avatar_c = userData.avatar_c || userData.avatar;
      
      const params = {
        records: [updateData]
      };
      
      const response = await apperClient.updateRecord('user_c', params);
      
      if (!response?.success) {
        console.error(response?.message || 'Failed to update user');
        throw new Error(response?.message || "Failed to update user");
      }
      
      if (response.results && response.results.length > 0) {
        const result = response.results[0];
        if (!result.success) {
          throw new Error(result.message || "Failed to update user");
        }
        return result.data;
      }
      
      throw new Error("Failed to update user");
    } catch (error) {
      console.error("Error updating user:", error?.response?.data?.message || error);
      throw error;
    }
  },

  async delete(id) {
    try {
      const params = {
        RecordIds: [parseInt(id)]
      };
      
      const response = await apperClient.deleteRecord('user_c', params);
      
      if (!response?.success) {
        console.error(response?.message || 'Failed to delete user');
        throw new Error(response?.message || "Failed to delete user");
      }
      
      return { success: true };
    } catch (error) {
      console.error("Error deleting user:", error?.response?.data?.message || error);
      throw error;
    }
  },

  async changeRole(id, newRole) {
    try {
      const params = {
        records: [
          {
            Id: parseInt(id),
            role_c: newRole
          }
        ]
      };
      
      const response = await apperClient.updateRecord('user_c', params);
      
      if (!response?.success) {
        console.error(response?.message || 'Failed to change user role');
        throw new Error(response?.message || "Failed to change user role");
      }
      
      if (response.results && response.results.length > 0) {
        const result = response.results[0];
        if (!result.success) {
          throw new Error(result.message || "Failed to change user role");
        }
        return result.data;
      }
      
      throw new Error("Failed to change user role");
    } catch (error) {
      console.error("Error changing user role:", error?.response?.data?.message || error);
      throw error;
    }
  }
};

export default userService;