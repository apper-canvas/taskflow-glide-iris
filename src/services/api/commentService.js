const { ApperClient } = window.ApperSDK;

const apperClient = new ApperClient({
  apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
  apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
});

const commentService = {
  async getAll() {
    try {
      const params = {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "Name"}},
          {"field": {"Name": "task_id_c"}},
          {"field": {"Name": "user_id_c"}},
          {"field": {"Name": "content_c"}},
          {"field": {"Name": "created_at_c"}}
        ]
      };
      
      const response = await apperClient.fetchRecords('comment_c', params);
      
      if (!response?.success) {
        console.error(response?.message || 'Failed to fetch comments');
        return [];
      }
      
      return response.data || [];
    } catch (error) {
      console.error("Error fetching comments:", error?.response?.data?.message || error);
      return [];
    }
  },

  async getById(id) {
    try {
      const params = {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "Name"}},
          {"field": {"Name": "task_id_c"}},
          {"field": {"Name": "user_id_c"}},
          {"field": {"Name": "content_c"}},
          {"field": {"Name": "created_at_c"}}
        ]
      };
      
      const response = await apperClient.getRecordById('comment_c', parseInt(id), params);
      
      if (!response?.success) {
        console.error(response?.message || 'Comment not found');
        throw new Error("Comment not found");
      }
      
      return response.data;
    } catch (error) {
      console.error(`Error fetching comment ${id}:`, error?.response?.data?.message || error);
      throw new Error("Comment not found");
    }
  },

  async getByTask(taskId) {
    try {
      const params = {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "Name"}},
          {"field": {"Name": "task_id_c"}},
          {"field": {"Name": "user_id_c"}},
          {"field": {"Name": "content_c"}},
          {"field": {"Name": "created_at_c"}}
        ],
        where: [
          {"FieldName": "task_id_c", "Operator": "EqualTo", "Values": [parseInt(taskId)]}
        ]
      };
      
      const response = await apperClient.fetchRecords('comment_c', params);
      
      if (!response?.success) {
        console.error(response?.message || 'Failed to fetch comments by task');
        return [];
      }
      
      return response.data || [];
    } catch (error) {
      console.error("Error fetching comments by task:", error?.response?.data?.message || error);
      return [];
    }
  },

  async create(commentData) {
    try {
      const params = {
        records: [
          {
            Name: `Comment by user ${commentData.user_id_c || commentData.userId}`,
            task_id_c: parseInt(commentData.task_id_c || commentData.taskId),
            user_id_c: parseInt(commentData.user_id_c || commentData.userId),
            content_c: commentData.content_c || commentData.content,
            created_at_c: new Date().toISOString()
          }
        ]
      };
      
      const response = await apperClient.createRecord('comment_c', params);
      
      if (!response?.success) {
        console.error(response?.message || 'Failed to create comment');
        throw new Error(response?.message || "Failed to create comment");
      }
      
      if (response.results && response.results.length > 0) {
        const result = response.results[0];
        if (!result.success) {
          throw new Error(result.message || "Failed to create comment");
        }
        return result.data;
      }
      
      throw new Error("Failed to create comment");
    } catch (error) {
      console.error("Error creating comment:", error?.response?.data?.message || error);
      throw error;
    }
  },

  async update(id, commentData) {
    try {
      const updateData = {
        Id: parseInt(id)
      };
      
      if (commentData.content_c || commentData.content) updateData.content_c = commentData.content_c || commentData.content;
      
      const params = {
        records: [updateData]
      };
      
      const response = await apperClient.updateRecord('comment_c', params);
      
      if (!response?.success) {
        console.error(response?.message || 'Failed to update comment');
        throw new Error(response?.message || "Failed to update comment");
      }
      
      if (response.results && response.results.length > 0) {
        const result = response.results[0];
        if (!result.success) {
          throw new Error(result.message || "Failed to update comment");
        }
        return result.data;
      }
      
      throw new Error("Failed to update comment");
    } catch (error) {
      console.error("Error updating comment:", error?.response?.data?.message || error);
      throw error;
    }
  },

  async delete(id) {
    try {
      const params = {
        RecordIds: [parseInt(id)]
      };
      
      const response = await apperClient.deleteRecord('comment_c', params);
      
      if (!response?.success) {
        console.error(response?.message || 'Failed to delete comment');
        throw new Error(response?.message || "Failed to delete comment");
      }
      
      return { success: true };
    } catch (error) {
      console.error("Error deleting comment:", error?.response?.data?.message || error);
      throw error;
    }
  }
};

export default commentService;