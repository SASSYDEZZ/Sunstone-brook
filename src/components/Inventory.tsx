import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { InventorySlot } from '../types';

interface InventoryProps {
  inventory: InventorySlot[];
  visible: boolean;
  onClose: () => void;
  onUseItem?: (itemId: string) => void;
}

export function Inventory({ inventory, visible, onClose, onUseItem }: InventoryProps) {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.inventoryContainer}>
          <View style={styles.header}>
            <Text style={styles.title}>Inventory</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.scrollView}>
            {inventory.length === 0 ? (
              <Text style={styles.emptyText}>Your inventory is empty</Text>
            ) : (
              <View style={styles.grid}>
                {inventory.map((slot, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.slot}
                    onPress={() => onUseItem && onUseItem(slot.item.id)}
                  >
                    <Text style={styles.icon}>{slot.item.icon}</Text>
                    <Text style={styles.itemName}>{slot.item.name}</Text>
                    <Text style={styles.quantity}>×{slot.quantity}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inventoryContainer: {
    width: '80%',
    maxWidth: 500,
    height: '70%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    borderBottomWidth: 2,
    borderBottomColor: '#e0e0e0',
    paddingBottom: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  closeButton: {
    padding: 8,
  },
  closeButtonText: {
    fontSize: 24,
    color: '#666',
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
    color: '#999',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  slot: {
    width: 100,
    height: 100,
    margin: 8,
    padding: 8,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 32,
    marginBottom: 4,
  },
  itemName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  quantity: {
    fontSize: 10,
    color: '#666',
    marginTop: 4,
  },
});
