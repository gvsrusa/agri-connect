# AgriConnect: Offline & Sync Module (Pseudocode & TDD Anchors)

## 1. Responsibilities

- Detect and track online/offline state
- Manage local storage for all core data (listings, prices, advisory, guidance, transport, user)
- Queue and replay sync operations when connectivity is restored
- Resolve data conflicts (e.g., last-write-wins)
- Notify user of sync status and errors
- Provide APIs for modules to read/write cached data

## 2. Module Structure

- OfflineSyncService
  - isOffline()
  - setOffline(state)
  - cacheData(type, data)
  - getCachedData(type, filters)
  - queueSyncOp(type, op, data)
  - getQueuedSyncOps()
  - performSyncOp(op)
  - syncAll()
  - clearSyncQueue()
  - resolveConflict(local, remote)
  - notifySyncStatus(status, error)
- OfflineSyncState
  - offline (bool)
  - syncQueue (array)
  - lastSync (timestamp)
  - syncStatus (string)
  - syncErrors (array)

## 3. Pseudocode

```
// OfflineSyncService: Handles all offline and sync logic

function isOffline():
    // TEST: Should return true if device is offline
    return checkNetworkStatus() == "offline"

function setOffline(state):
    // TEST: Should update offline state and notify modules
    offline = state
    notifyModulesOfOfflineState(state)

function cacheData(type, data):
    // TEST: Should cache data by type (e.g., listings, prices)
    saveToLocalStorage(type, data)
    return success

function getCachedData(type, filters):
    // TEST: Should return cached data filtered by type/filters
    data = loadFromLocalStorage(type)
    return applyFilters(data, filters)

function queueSyncOp(type, op, data):
    // TEST: Should queue sync operation when offline
    syncQueue.append({type, op, data})
    return success

function getQueuedSyncOps():
    // TEST: Should return all queued sync operations
    return syncQueue

function performSyncOp(op):
    // TEST: Should perform sync operation and handle errors
    response = callApiForOp(op)
    if response.error:
        // TEST: Should log sync error
        syncErrors.append({op, response.error})
        return error(response.error)
    return success

function syncAll():
    // TEST: Should replay all queued sync operations when online
    if isOffline():
        return
    for op in getQueuedSyncOps():
        result = performSyncOp(op)
        if result.error:
            notifySyncStatus("error", result.error)
    clearSyncQueue()
    updateLastSyncTimestamp()
    notifySyncStatus("success", null)
    return success

function clearSyncQueue():
    // TEST: Should clear sync queue after successful sync
    syncQueue = []
    return success

function resolveConflict(local, remote):
    // TEST: Should resolve data conflict (last-write-wins)
    if local.updated_at > remote.updated_at:
        return local
    return remote

function notifySyncStatus(status, error):
    // TEST: Should notify user of sync status and errors
    displaySyncStatusToUser(status, error)
```

## 4. TDD Anchors

- // TEST: Should return true if device is offline
- // TEST: Should update offline state and notify modules
- // TEST: Should cache data by type (e.g., listings, prices)
- // TEST: Should return cached data filtered by type/filters
- // TEST: Should queue sync operation when offline
- // TEST: Should return all queued sync operations
- // TEST: Should perform sync operation and handle errors
- // TEST: Should log sync error
- // TEST: Should replay all queued sync operations when online
- // TEST: Should clear sync queue after successful sync
- // TEST: Should resolve data conflict (last-write-wins)
- // TEST: Should notify user of sync status and errors

## 5. Error Handling

- All errors return user-friendly, localized messages
- Sync errors logged and displayed to user
- Data conflicts resolved automatically

## 6. Performance

- Local storage optimized for quick access
- Sync operations batched to minimize data usage