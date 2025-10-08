const { ApperClient } = window.ApperSDK;

const apperClient = new ApperClient({
  apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
  apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
});

const projectService = {
  async getAll() {
    try {
      const params = {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "Name"}},
          {"field": {"Name": "title_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "manager_id_c"}},
          {"field": {"Name": "status_c"}},
          {"field": {"Name": "start_date_c"}},
          {"field": {"Name": "end_date_c"}},
          {"field": {"Name": "team_members_c"}},
          {"field": {"Name": "created_at_c"}}
        ]
      };
      
      const response = await apperClient.fetchRecords('project_c', params);
      
      if (!response?.success) {
        console.error(response?.message || 'Failed to fetch projects');
        return [];
      }
      
      const projects = (response.data || []).map(project => ({
        ...project,
        teamMembers: project.team_members_c ? 
          project.team_members_c.split(',').map(id => parseInt(id.trim())).filter(id => !isNaN(id)) : []
      }));
      
      return projects;
    } catch (error) {
      console.error("Error fetching projects:", error?.response?.data?.message || error);
      return [];
    }
  },

  async getById(id) {
    try {
      const params = {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "Name"}},
          {"field": {"Name": "title_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "manager_id_c"}},
          {"field": {"Name": "status_c"}},
          {"field": {"Name": "start_date_c"}},
          {"field": {"Name": "end_date_c"}},
          {"field": {"Name": "team_members_c"}},
          {"field": {"Name": "created_at_c"}}
        ]
      };
      
      const response = await apperClient.getRecordById('project_c', parseInt(id), params);
      
      if (!response?.success) {
        console.error(response?.message || 'Project not found');
        throw new Error("Project not found");
      }
      
      const project = response.data;
      return {
        ...project,
        teamMembers: project.team_members_c ? 
          project.team_members_c.split(',').map(id => parseInt(id.trim())).filter(id => !isNaN(id)) : []
      };
    } catch (error) {
      console.error(`Error fetching project ${id}:`, error?.response?.data?.message || error);
      throw new Error("Project not found");
    }
  },

  async getByManager(managerId) {
    try {
      const params = {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "Name"}},
          {"field": {"Name": "title_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "manager_id_c"}},
          {"field": {"Name": "status_c"}},
          {"field": {"Name": "start_date_c"}},
          {"field": {"Name": "end_date_c"}},
          {"field": {"Name": "team_members_c"}},
          {"field": {"Name": "created_at_c"}}
        ],
        where: [
          {"FieldName": "manager_id_c", "Operator": "EqualTo", "Values": [parseInt(managerId)]}
        ]
      };
      
      const response = await apperClient.fetchRecords('project_c', params);
      
      if (!response?.success) {
        console.error(response?.message || 'Failed to fetch projects by manager');
        return [];
      }
      
      const projects = (response.data || []).map(project => ({
        ...project,
        teamMembers: project.team_members_c ? 
          project.team_members_c.split(',').map(id => parseInt(id.trim())).filter(id => !isNaN(id)) : []
      }));
      
      return projects;
    } catch (error) {
      console.error("Error fetching projects by manager:", error?.response?.data?.message || error);
      return [];
    }
  },

  async getByMember(memberId) {
    try {
      const params = {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "Name"}},
          {"field": {"Name": "title_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "manager_id_c"}},
          {"field": {"Name": "status_c"}},
          {"field": {"Name": "start_date_c"}},
          {"field": {"Name": "end_date_c"}},
          {"field": {"Name": "team_members_c"}},
          {"field": {"Name": "created_at_c"}}
        ]
      };
      
      const response = await apperClient.fetchRecords('project_c', params);
      
      if (!response?.success) {
        console.error(response?.message || 'Failed to fetch projects');
        return [];
      }
      
      const memberIdNum = parseInt(memberId);
      const projects = (response.data || [])
        .filter(project => {
          if (!project.team_members_c) return false;
          const teamMembers = project.team_members_c.split(',').map(id => parseInt(id.trim())).filter(id => !isNaN(id));
          return teamMembers.includes(memberIdNum);
        })
        .map(project => ({
          ...project,
          teamMembers: project.team_members_c.split(',').map(id => parseInt(id.trim())).filter(id => !isNaN(id))
        }));
      
      return projects;
    } catch (error) {
      console.error("Error fetching projects by member:", error?.response?.data?.message || error);
      return [];
    }
  },

  async getByStatus(status) {
    try {
      const params = {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "Name"}},
          {"field": {"Name": "title_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "manager_id_c"}},
          {"field": {"Name": "status_c"}},
          {"field": {"Name": "start_date_c"}},
          {"field": {"Name": "end_date_c"}},
          {"field": {"Name": "team_members_c"}},
          {"field": {"Name": "created_at_c"}}
        ],
        where: [
          {"FieldName": "status_c", "Operator": "EqualTo", "Values": [status]}
        ]
      };
      
      const response = await apperClient.fetchRecords('project_c', params);
      
      if (!response?.success) {
        console.error(response?.message || 'Failed to fetch projects by status');
        return [];
      }
      
      const projects = (response.data || []).map(project => ({
        ...project,
        teamMembers: project.team_members_c ? 
          project.team_members_c.split(',').map(id => parseInt(id.trim())).filter(id => !isNaN(id)) : []
      }));
      
      return projects;
    } catch (error) {
      console.error("Error fetching projects by status:", error?.response?.data?.message || error);
      return [];
    }
  },

  async create(projectData) {
    try {
      const teamMembersStr = projectData.teamMembers && Array.isArray(projectData.teamMembers) ?
        projectData.teamMembers.join(',') : '';
      
      const params = {
        records: [
          {
            Name: projectData.title_c || projectData.title,
            title_c: projectData.title_c || projectData.title,
            description_c: projectData.description_c || projectData.description,
            manager_id_c: parseInt(projectData.manager_id_c || projectData.managerId),
            status_c: projectData.status_c || projectData.status || "planning",
            start_date_c: projectData.start_date_c || projectData.startDate,
            end_date_c: projectData.end_date_c || projectData.endDate,
            team_members_c: teamMembersStr,
            created_at_c: new Date().toISOString()
          }
        ]
      };
      
      const response = await apperClient.createRecord('project_c', params);
      
      if (!response?.success) {
        console.error(response?.message || 'Failed to create project');
        throw new Error(response?.message || "Failed to create project");
      }
      
      if (response.results && response.results.length > 0) {
        const result = response.results[0];
        if (!result.success) {
          throw new Error(result.message || "Failed to create project");
        }
        return {
          ...result.data,
          teamMembers: result.data.team_members_c ? 
            result.data.team_members_c.split(',').map(id => parseInt(id.trim())).filter(id => !isNaN(id)) : []
        };
      }
      
      throw new Error("Failed to create project");
    } catch (error) {
      console.error("Error creating project:", error?.response?.data?.message || error);
      throw error;
    }
  },

  async update(id, projectData) {
    try {
      const updateData = {
        Id: parseInt(id)
      };
      
      if (projectData.title_c || projectData.title) {
        updateData.title_c = projectData.title_c || projectData.title;
        updateData.Name = projectData.title_c || projectData.title;
      }
      if (projectData.description_c || projectData.description) updateData.description_c = projectData.description_c || projectData.description;
      if (projectData.manager_id_c || projectData.managerId) updateData.manager_id_c = parseInt(projectData.manager_id_c || projectData.managerId);
      if (projectData.status_c || projectData.status) updateData.status_c = projectData.status_c || projectData.status;
      if (projectData.start_date_c || projectData.startDate) updateData.start_date_c = projectData.start_date_c || projectData.startDate;
      if (projectData.end_date_c || projectData.endDate) updateData.end_date_c = projectData.end_date_c || projectData.endDate;
      if (projectData.team_members_c || projectData.teamMembers) {
        updateData.team_members_c = Array.isArray(projectData.teamMembers) ?
          projectData.teamMembers.join(',') : projectData.team_members_c;
      }
      
      const params = {
        records: [updateData]
      };
      
      const response = await apperClient.updateRecord('project_c', params);
      
      if (!response?.success) {
        console.error(response?.message || 'Failed to update project');
        throw new Error(response?.message || "Failed to update project");
      }
      
      if (response.results && response.results.length > 0) {
        const result = response.results[0];
        if (!result.success) {
          throw new Error(result.message || "Failed to update project");
        }
        return {
          ...result.data,
          teamMembers: result.data.team_members_c ? 
            result.data.team_members_c.split(',').map(id => parseInt(id.trim())).filter(id => !isNaN(id)) : []
        };
      }
      
      throw new Error("Failed to update project");
    } catch (error) {
      console.error("Error updating project:", error?.response?.data?.message || error);
      throw error;
    }
  },

  async delete(id) {
    try {
      const params = {
        RecordIds: [parseInt(id)]
      };
      
      const response = await apperClient.deleteRecord('project_c', params);
      
      if (!response?.success) {
        console.error(response?.message || 'Failed to delete project');
        throw new Error(response?.message || "Failed to delete project");
      }
      
      return { success: true };
    } catch (error) {
      console.error("Error deleting project:", error?.response?.data?.message || error);
      throw error;
    }
  },

  async addTeamMember(projectId, memberId) {
    try {
      const project = await this.getById(projectId);
      const teamMembers = project.teamMembers || [];
      
      if (!teamMembers.includes(parseInt(memberId))) {
        teamMembers.push(parseInt(memberId));
      }
      
      const params = {
        records: [
          {
            Id: parseInt(projectId),
            team_members_c: teamMembers.join(',')
          }
        ]
      };
      
      const response = await apperClient.updateRecord('project_c', params);
      
      if (!response?.success) {
        console.error(response?.message || 'Failed to add team member');
        throw new Error(response?.message || "Failed to add team member");
      }
      
      if (response.results && response.results.length > 0) {
        const result = response.results[0];
        if (!result.success) {
          throw new Error(result.message || "Failed to add team member");
        }
        return {
          ...result.data,
          teamMembers: result.data.team_members_c ? 
            result.data.team_members_c.split(',').map(id => parseInt(id.trim())).filter(id => !isNaN(id)) : []
        };
      }
      
      throw new Error("Failed to add team member");
    } catch (error) {
      console.error("Error adding team member:", error?.response?.data?.message || error);
      throw error;
    }
  },

  async removeTeamMember(projectId, memberId) {
    try {
      const project = await this.getById(projectId);
      const teamMembers = (project.teamMembers || []).filter(id => id !== parseInt(memberId));
      
      const params = {
        records: [
          {
            Id: parseInt(projectId),
            team_members_c: teamMembers.join(',')
          }
        ]
      };
      
      const response = await apperClient.updateRecord('project_c', params);
      
      if (!response?.success) {
        console.error(response?.message || 'Failed to remove team member');
        throw new Error(response?.message || "Failed to remove team member");
      }
      
      if (response.results && response.results.length > 0) {
        const result = response.results[0];
        if (!result.success) {
          throw new Error(result.message || "Failed to remove team member");
        }
        return {
          ...result.data,
          teamMembers: result.data.team_members_c ? 
            result.data.team_members_c.split(',').map(id => parseInt(id.trim())).filter(id => !isNaN(id)) : []
        };
      }
      
      throw new Error("Failed to remove team member");
    } catch (error) {
      console.error("Error removing team member:", error?.response?.data?.message || error);
      throw error;
    }
  }
};

export default projectService;