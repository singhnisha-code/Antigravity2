import React from 'react';
import { motion } from 'framer-motion';
import { FrappeGantt, Task, ViewMode } from 'frappe-gantt-react';
import { Moment } from 'moment';

const tasks: Task[] = [
  new Task({
    id: 'Task 1',
    name: 'Foundation Piling',
    start: '2026-05-01',
    end: '2026-05-15',
    progress: 100,
    dependencies: '',
  }),
  new Task({
    id: 'Task 2',
    name: 'Basement Slabbing',
    start: '2026-05-16',
    end: '2026-06-10',
    progress: 45,
    dependencies: 'Task 1',
  }),
  new Task({
    id: 'Task 3',
    name: 'Structural Pillars',
    start: '2026-06-11',
    end: '2026-07-20',
    progress: 0,
    dependencies: 'Task 2',
  })
];

const ProjectGantt = () => {
  return (
    <div className="glass-card p-4 overflow-hidden h-[500px]">
      <div className="flex justify-between items-center mb-6 px-4">
        <h3 className="font-bold text-lg">Project Timeline (Gantt)</h3>
        <div className="flex gap-2">
          <button className="px-3 py-1 bg-white/5 rounded-lg text-[10px] font-bold uppercase hover:bg-primary hover:text-secondary transition-all">Day</button>
          <button className="px-3 py-1 bg-white/5 rounded-lg text-[10px] font-bold uppercase hover:bg-primary hover:text-secondary transition-all">Week</button>
          <button className="px-3 py-1 bg-white/5 rounded-lg text-[10px] font-bold uppercase hover:bg-primary hover:text-secondary transition-all">Month</button>
        </div>
      </div>
      
      <div className="gantt-container overflow-x-auto">
        <FrappeGantt
          tasks={tasks}
          viewMode={ViewMode.Month}
          onClick={(task: Task) => console.log(task)}
          onDateChange={(task: Task, start: Moment, end: Moment) => console.log(task, start, end)}
          onProgressChange={(task: Task, progress: number) => console.log(task, progress)}
          onTasksChange={(tasks: Task[]) => console.log(tasks)}
        />
      </div>

      <style>{`
        .gantt .grid-header { fill: #0F172A; stroke: #1e293b; }
        .gantt .grid-row { fill: transparent; stroke: #1e293b; }
        .gantt .bar { fill: #C89B3C; }
        .gantt .bar-progress { fill: #A67C2A; }
        .gantt .bar-label { fill: #ffffff; font-weight: bold; font-size: 10px; }
        .gantt .upper-header { fill: #1e293b; text-transform: uppercase; font-size: 10px; letter-spacing: 1px; }
        .gantt .lower-header { fill: #64748b; font-size: 9px; }
      `}</style>
    </div>
  );
};

export default ProjectGantt;

