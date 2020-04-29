import {TimeRecord, TimeRecordType} from "./TimeRecord";

const prepareResponse = (promise: any) => promise
    .then((e: TimeRecordType[] | TimeRecordType) => ({error: false, data: Array.isArray(e) ? dbModelsToLogic(e) : dbModelToLogic(e)}))
    .catch((e: any) => ({error: true, errors: e}))

const listTimeRecords = () => prepareResponse(TimeRecord.find())

const createTimeRecord = (timeRecordInput: any) => prepareResponse(TimeRecord.create(timeRecordInput))

const removeTimeRecord = (id: String) => prepareResponse(TimeRecord.findOneAndRemove({_id: id}))

const editTimeRecord = ({timeRecordInput, id}: {timeRecordInput: any, id: String}) => prepareResponse(TimeRecord.findOneAndUpdate({_id: id}, timeRecordInput, {new: true}))

const dbModelToLogic = ({name, timeElapsed, _id, startDate, endDate}: TimeRecordType) => ({name, timeElapsed, id: _id, startDate, endDate})
const dbModelsToLogic = (tasks: TimeRecordType[]) => tasks.map(t => dbModelToLogic(t))

export default {listTimeRecords, createTimeRecord, editTimeRecord, removeTimeRecord}