import React, { useEffect } from 'react';
import { ProjectHeader } from '../Components/ProjectHeader';
import { Project } from './Project';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentProject, setTasksByStatus } from '../Reducer/Slice/ProjectSlice';

export const DashBoard = () => {
  const project = useSelector((state)=> state.project.currentProject);
  const params = useParams();
  const {projectTitle} = params;
  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(setCurrentProject({projectTitle}))
      dispatch(setTasksByStatus({projectTitle}));
  }, [projectTitle, dispatch]);

  return (
    <>
      <ProjectHeader projectTitle={project?.title}/>
      <Project project={project ?? null}/>
    </>
  )
}
