import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const JobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const name = queryParams.get('name');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/v1/jobs?name=${name}`);
        setJobs(response.data);
      } catch (err) {
        console.log(err);
        setError('Failed to load job listings. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (name) {
      fetchJobs();
    } else {
      setError('No name parameter provided - unable to fetch jobs');
      setLoading(false);
    }
  }, [name]);

  return (
    <JobsContainer>
      <PageHeader>Job Matches for {name}</PageHeader>

      {loading ? (
        <LoadingMessage>Searching for matching jobs...</LoadingMessage>
      ) : error ? (
        <ErrorMessage>{error}</ErrorMessage>
      ) : jobs.length === 0 ? (
        <NoJobsMessage>No jobs found matching your skills</NoJobsMessage>
      ) : (
        <JobList>
          {jobs.map((job) => (
            <JobCard key={job.id}>
              <div>
                <JobTitle>{job.title}</JobTitle>
                <JobDetails>
                  <Company>{job.company?.display_name || 'Company not specified'}</Company>
                  <Location>{job.location?.display_name || 'Location not specified'}</Location>
                </JobDetails>
              </div>
              <ApplyButton
                href={job.redirect_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Apply Now
              </ApplyButton>
            </JobCard>
          ))}
        </JobList>
      )}
    </JobsContainer>
  );
};


const JobsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const PageHeader = styled.h1`
  text-align: center;
  color: #2d3748;
  margin-bottom: 2rem;
  font-size: 2rem;
`;

const JobList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  padding: 1rem;
`;

const JobCard = styled.div`
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
  display: flex;
  flex-direction: column;
  height: 100%; /* Ensure all cards have the same height */
  justify-content: space-between; /* Push button to the bottom */

  &:hover {
    transform: translateY(-2px);
  }
`;

const JobTitle = styled.h3`
  color: #2d3748;
  margin: 0 0 1rem;
  font-size: 1.25rem;
`;

const JobDetails = styled.div`
  margin-bottom: 1.5rem;
`;

const Company = styled.p`
  color: #4a5568;
  margin: 0 0 0.5rem;
  font-weight: 500;
`;

const Location = styled.p`
  color: #718096;
  margin: 0;
  font-size: 0.875rem;
`;

const ApplyButton = styled.a`
  display: inline-block;
  background-color: #4299e1;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 500;
  transition: background-color 0.2s ease;
  text-align: center;
  margin-top: auto; /* Ensure button stays at the bottom */

  &:hover {
    background-color: #3182ce;
  }
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: #4a5568;
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: #e53e3e;
`;

const NoJobsMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: #718096;
`;

export default JobsPage;