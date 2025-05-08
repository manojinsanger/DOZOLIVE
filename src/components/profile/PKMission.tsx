import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import beanIcon from '@/assets/images/bean.png';
import { scaleFont, scaleHeight } from '@/constants/scaling';
import customColors from '@/constants/styles';

// Define types for type safety
interface PkMissionSubTask {
  id: string;
  title: string;
  goalProgress: string;
  rewardPoints: number;
  actionLabel: string;
}

interface PkMissionTask {
  id: string;
  taskGroup: string;
  description?: string;
  totalPoints: number;
  isHidden: boolean;
  timeline: PkMissionSubTask[];
}

// PK Mission data based on the image
const pkMissionTasks: PkMissionTask[] = [
  {
    id: 'pk-mission-1',
    taskGroup:
      'PK Winning Streak Mission each PK must be >7200, each PK gift receiving>5000 points',
    // description: 'each PK must be >7200, each PK gift receiving>5000 points',
    totalPoints: 16000,
    isHidden: false,
    timeline: [
      {
        id: 'pk-sub1',
        title: '1 random PK win',
        goalProgress: '0/1',
        rewardPoints: 1000,
        actionLabel: 'GO',
      },
      {
        id: 'pk-sub2',
        title: '3 random PK winning streak',
        goalProgress: '0/3',
        rewardPoints: 1000,
        actionLabel: 'GO',
      },
      {
        id: 'pk-sub3',
        title: '5 random PK winning streak',
        goalProgress: '0/5',
        rewardPoints: 3000,
        actionLabel: 'GO',
      },
      {
        id: 'pk-sub4',
        title: '7 random PK winning streak',
        goalProgress: '0/7',
        rewardPoints: 3000,
        actionLabel: 'GO',
      },
      {
        id: 'pk-sub5',
        title: '10 random PK winning streak',
        goalProgress: '0/10',
        rewardPoints: 3000,
        actionLabel: 'GO',
      },
      {
        id: 'pk-sub6',
        title: '15 random PK winning streak',
        goalProgress: '0/15',
        rewardPoints: 5000,
        actionLabel: 'GO',
      },
    ],
  },
];

const PKMissionScreen: React.FC = () => {
  const [tasks, setTasks] = useState<PkMissionTask[]>(pkMissionTasks);

  const toggleHideGroup = (groupId: string) => {
    setTasks(currentTasks =>
      currentTasks.map(task =>
        task.id === groupId ? { ...task, isHidden: !task.isHidden } : task,
      ),
    );
  };

  return (
    <ScrollView style={styles.container}>
      {tasks.map(taskGroup => (
        <View key={taskGroup.id} style={styles.taskGroupContainer}>
          <View style={styles.taskGroupHeader}>
            <View style={styles.pkIconContainer}>
              <Text style={styles.pkIconText}>PK</Text>
            </View>
            <View style={styles.taskGroupTitleContainer}>
              <Text style={styles.taskGroupTitle}>{taskGroup.taskGroup}</Text>
              {taskGroup.description && (
                <Text style={styles.taskGroupDescription}>
                  {taskGroup.description}
                </Text>
              )}

              <View style={styles.subTaskRewardContainer}>
                <Image source={beanIcon} style={styles.beanIcon} />
                <Text style={styles.taskGroupRewardText}>
                  +{taskGroup.totalPoints}
                </Text>
              </View>
            </View>

            <View style={styles.taskGroupReward}>
              <TouchableOpacity
                style={styles.hideButton}
                onPress={() => toggleHideGroup(taskGroup.id)}>
                <Text style={styles.hideButtonText}>
                  {taskGroup.isHidden ? 'Show' : 'Hide'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {!taskGroup.isHidden &&
            taskGroup.timeline.map(subTask => (
              <View key={subTask.id} style={styles.subTaskContainer}>
                <View style={styles.timeline}>
                  <View style={styles.timelineDot} />
                  <View style={styles.timelineLine} />
                </View>

                <View style={styles.subTaskContent}>
                  <View style={styles.subTaskTitle}>
                    <Text style={styles.subTaskTitleText}>{subTask.title}</Text>
                    <Text style={styles.subTaskProgress}>
                      ({subTask.goalProgress})
                    </Text>
                    <View style={styles.subTaskRewardContainer}>
                      <Image source={beanIcon} style={styles.beanIcon} />
                      <Text style={styles.subTaskRewardText}>
                        +{subTask.rewardPoints}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.subTaskReward}>
                    <TouchableOpacity style={styles.actionButton}>
                      <Text style={styles.actionButtonText}>
                        {subTask.actionLabel}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
        </View>
      ))}

      {/* Timer at bottom */}
      {/* <View style={styles.timerContainer}>
        <Text style={styles.timerText}>05:49:15</Text>
      </View> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#f5f5f5',
    // paddingHorizontal: 16,
    paddingTop: 10,
  },
  row: {
    flexDirection: 'row',
  },

  // Task group styles
  taskGroupContainer: {
    borderWidth: 1, 
    borderColor: customColors.gray200, 
    borderRadius: 20, 
    marginBottom: scaleHeight(40)

  },
  taskGroupHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  pkIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#ff9933',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  pkIconText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: scaleFont(12),
  },
  taskGroupTitleContainer: {
    flex: 1,
  },
  taskGroupTitle: {
    fontWeight: 'bold',
    fontSize: scaleFont(12),
    color: '#333',
  },
  taskGroupDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  taskGroupReward: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  beanIcon: {
    width: 14,
    height: 14,
    marginRight: 4,
    resizeMode: 'contain',
  },
  taskGroupRewardText: {
    fontWeight: 'bold',
    marginRight: 8,
    color: '#ff69b4',
  },
  hideButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  hideButtonText: {
    color: '#6495ed',
    marginRight: 2,
  },
  hideArrow: {
    color: '#6495ed',
    fontWeight: 'bold',
  },

  // Subtask styles
  subTaskContainer: {
    flexDirection: 'row',
    padding: 16,
    paddingTop: 12,
    paddingBottom: 12,
  },
  timeline: {
    width: 20,
    alignItems: 'center',
    marginRight: 12,
    position: 'relative',
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#6495ed',
    zIndex: 10,
  },
  timelineLine: {
    width: 2,
    height: '100%',
    backgroundColor: '#ddd',
    position: 'absolute',
    top: 12,
    left: 9,
  },
  subTaskContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subTaskTitle: {
    flex: 1,
  },
  subTaskTitleText: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#333',
  },
  subTaskProgress: {
    color: '#888',
    fontSize: scaleFont(12),
    marginTop: 2,
  },
  subTaskReward: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subTaskRewardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
    backgroundColor: '#fcefff',
    justifyContent: 'center',
    padding: 3,
    borderRadius: 10,
    alignSelf: 'flex-start'
  },
  subTaskRewardText: {
    color: '#ff69b4',
    fontWeight: 'bold',
  },
  actionButton: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  actionButtonText: {
    color: '#6495ed',
    fontWeight: 'bold',
  },
});

export default PKMissionScreen;
