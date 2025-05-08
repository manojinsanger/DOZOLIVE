import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import EarningsCard from './EarningsCard';
import beanIcon from '@/assets/images/bean.png';
import ThemedText from '../ThemedText';
import { scaleFont, scaleHeight, scaleWidth } from '@/constants/scaling';
import dropdwonIcon from "@/assets/images/profile_assets/dropdwon.webp"
import AntDesign from 'react-native-vector-icons/AntDesign'
import customColors from '@/constants/styles';
import FontAwesome from 'react-native-vector-icons/FontAwesome'


interface PkMissionSubTask {
  id: string;
  title: string;
  goalProgress: string;
  rewardPoints: number;
  actionLabel: string;
}

interface LiveTaskTimeline {
  id: string;
  taskGroup: string;
  totalPoints: number;
  isHidden: boolean;
  progress?: string;
  secondaryDescription?: string;
  description?: string;
  timeline: PkMissionSubTask[];
}

const timelineTasks = [
  {
    id: 'group1',
    taskGroup: 'Daily Live duration≥ 60 minutes',
    totalPoints: 1200,
    isHidden: false,
    progress: '196/1,000, 14/60',
    timeline: [
      {
        id: 'sub1',
        title: 'Daily income ≥ 1000 points',
        goalProgress: '',
        rewardPoints: 1200,
        actionLabel: 'GO',
      },
    ],
  },
  {
    id: 'group2',
    taskGroup: 'Exclusive Event Task',
    totalPoints: 3300,
    isHidden: false,
    progress: '',
    timeline: [
      {
        id: 'sub2',
        title: 'eligible host live duration ≥ 60 minutes',
        goalProgress: '0/6, 14/60',
        description:
          'For non-new female hosts The number of user (same state, different devices) signing in live room ≥ 6 Only count solo live',
        rewardPoints: 10000,
        actionLabel: 'GO',
      },
      {
        id: 'sub3',
        title: 'eligible host live duration ≥ 120 minutes',
        goalProgress: '0/10, 14/120',
        description: 'For non-new female hosts',
        secondaryDescription:
          'The number of user (same state, different devices) signing in live room ≥ 10',
        tertiaryDescription: 'Only count solo live',
        rewardPoints: 10000,
        actionLabel: 'GO',
      },
      {
        id: 'sub4',
        title: 'eligible host live duration ≥ 180 minutes',
        goalProgress: '0/15, 14/180',
        description:
          'For non-new female hosts The number of user (same state, different devices) signing in live room ≥ 15 Only count solo live',
        rewardPoints: 10000,
        actionLabel: 'GO',
      },
    ],
  },
  {
    id: 'group3',
    taskGroup: 'Income Hourly Task Reward',
    totalPoints: 30000,
    isHidden: false,
    timeline: [
      {
        id: 'sub1',
        title: 'Live and Call Income ≥ 40000 points',
        goalProgress: '0/40,000, 14/60',
        description: 'live duration ≥ 60 minutes',
        rewardPoints: 10000,
        actionLabel: 'GO',
      },
      {
        id: 'sub2',
        title: 'Live and Call Income ≥ 90000',
        goalProgress: '',
        rewardPoints: 0,
        actionLabel: 'GO',
      },
    ],
  },
];

const LiveTask: React.FC = () => {
  const [tasks, setTasks] = useState<LiveTaskTimeline[]>(timelineTasks);

  const toggleHideGroup = (groupId: string) => {
    setTasks(currentTasks =>
      currentTasks.map(task =>
        task.id === groupId ? { ...task, isHidden: !task.isHidden } : task,
      ),
    );
  };
  return (
    <View  style={{borderWidth:1,borderColor:customColors.gray200,borderRadius:20,marginBottom:scaleHeight(40)}}>
      <EarningsCard />

      {/* Timeline Tasks */}
      {tasks.map(taskGroup => (
        <View key={taskGroup.id} style={styles.taskGroupContainer}>
          {taskGroup.id === 'group1' && (
            <View style={styles.taskHeader}>
              <View style={styles.playIconContainer}>
                <AntDesign name={'caretright'} color={customColors.white}/>
              </View>
              <View style={styles.taskHeaderContent}>
                <ThemedText style={styles.taskGroupTitle}>
                  {taskGroup.taskGroup}
                </ThemedText>
                <ThemedText style={styles.taskProgress}>
                  ({taskGroup.progress})
                </ThemedText>
                <View style={styles.taskRewardContainer}>
                  <Image source={beanIcon} style={styles.beanIcon} />
                  <ThemedText style={styles.taskRewardText}>
                    +{taskGroup.totalPoints}
                  </ThemedText>
                </View>
              </View>
              <TouchableOpacity style={styles.goButton}>
                <ThemedText style={styles.goButtonText}>GO</ThemedText>
              </TouchableOpacity>
            </View>
          )}

          {taskGroup.id !== 'group1' && (
            <View style={styles.taskGroupHeader}>
              {taskGroup.id === 'group2' ? (
                <View style={styles.exclusiveEventIcon}>
                <FontAwesome name={"arrow-up"} color={customColors.white} />
                </View>
              ) : (
                <View style={styles.playIconContainer}>

                  <AntDesign name={'caretright'} color={customColors.white}/>

                </View>
              )}
              <View style={styles.taskGroupTitleContainer}>
                <ThemedText style={styles.taskGroupTitle}>
                  {taskGroup.taskGroup}
                </ThemedText>
              </View>

              <View style={styles.taskGroupReward}>
                <Image source={beanIcon} style={styles.beanIcon} />
                <ThemedText style={styles.taskGroupRewardText}>
                  +{taskGroup.totalPoints}
                </ThemedText>
                <TouchableOpacity
                  style={styles.hideButton}
                  onPress={() => toggleHideGroup(taskGroup.id)}>
                  <ThemedText style={styles.hideButtonText}>
                    {taskGroup.isHidden ? 'Show' : 'Hide'}
                  </ThemedText>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {!taskGroup.isHidden &&
            taskGroup.id !== 'group1' &&
            taskGroup.timeline.map(subTask => (
              <View key={subTask.id} style={styles.subTaskContainer}>
                <View style={styles.timeline}>
                  <View style={styles.timelineDot} />
                  <View style={styles.timelineLine} />
                </View>

                <View style={styles.subTaskContent}>
                  <View style={styles.subTaskDetails}>
                    <ThemedText style={styles.subTaskTitle}>
                      {subTask.title}
                    </ThemedText>
                    {subTask.goalProgress && (
                      <ThemedText style={styles.subTaskProgress}>
                        ({subTask.goalProgress})
                      </ThemedText>
                    )}
                    {subTask.description && (
                      <ThemedText style={styles.subTaskDescription}>
                        {subTask.description}
                      </ThemedText>
                    )}
                    {subTask.secondaryDescription && (
                      <ThemedText style={styles.subTaskDescription}>
                        {subTask.secondaryDescription}
                      </ThemedText>
                    )}
                    {subTask.tertiaryDescription && (
                      <ThemedText style={styles.subTaskDescription}>
                        {subTask.tertiaryDescription}
                      </ThemedText>
                    )}
                  </View>

                  <View style={styles.subTaskReward}>
                    <View style={styles.subTaskRewardContainer}>
                      <Image source={beanIcon} style={styles.beanIcon} />
                      <ThemedText style={styles.subTaskRewardText}>
                        +{subTask.rewardPoints}
                      </ThemedText>
                    </View>

                    {subTask.actionLabel && (
                      <TouchableOpacity style={styles.actionButton}>
                        <ThemedText style={styles.actionButtonText}>
                          {subTask.actionLabel}
                        </ThemedText>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              </View>
            ))}
        </View>
      ))}
    </View >
  );
};

export default LiveTask;

const styles = StyleSheet.create({
  // Task group styles
  taskGroupContainer: {
    // backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 16,
  },
  dropdownIcon: {
    width: 18,
    height: 18,
  },
  beanIcon: {
    width: scaleWidth(14),
    height: scaleHeight(14),
    marginRight: 4,
    resizeMode: 'contain',
  },
  taskHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  playIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#9932cc',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    borderWidth: 2,
    borderColor: '#f0f0f0',
  },
  playIcon: {
    color: 'white',
    fontSize: scaleFont(12),
  },
  taskHeaderContent: {
    flex: 1,
  },
  taskGroupTitle: {
    fontWeight: 'bold',
    fontSize: scaleFont(12),
  },
  taskProgress: {
    color: '#888',
    fontSize: scaleFont(12),
    marginTop: 2,
  },
  taskRewardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  taskRewardText: {
    color: '#ff69b4',
    fontWeight: 'bold',
  },
  goButton: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 20,
  },
  goButtonText: {
    color: '#6495ed',
    fontWeight: 'bold',
  },

  // Task group header styles
  taskGroupHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  exclusiveEventIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#9932cc',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    borderWidth: 2,
    borderColor: '#f0f0f0',
  },
  exclusiveEventIconText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: scaleFont(12),
  },
  taskGroupTitleContainer: {
    flex: 1,
  },
  taskGroupReward: {
    flexDirection: 'row',
    alignItems: 'center',
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
    paddingTop: 8,
    paddingBottom: 12,
  },
  timeline: {
    width: 16,
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
    left: 7,
  },
  subTaskContent: {
    flex: 1,
  },
  subTaskDetails: {
    marginBottom: 8,
  },
  subTaskTitle: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  subTaskProgress: {
    color: '#888',
    fontSize: scaleFont(12),
    marginTop: 2,
  },
  subTaskDescription: {
    color: '#888',
    fontSize: scaleFont(12),
    marginTop: 2,
  },
  subTaskReward: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subTaskRewardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
