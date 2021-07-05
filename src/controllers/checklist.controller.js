const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const checklistService = require('../services/checklist.service');

const getAllByActivityId = catchAsync(async (req, res) => {
    const checklists = await checklistService.getAllByActivityId(req.user, req.params.maintenancePlanActivityId);
    res.status(httpStatus.OK).send(checklists);
});

const create = catchAsync(async (req, res) => {
    const created = await checklistService.create(req.user, req.body);
    res.status(httpStatus.CREATED).send(created);
});

const remove = catchAsync(async (req, res) => {
    await checklistService.remove(req.params.id);
    res.status(httpStatus.OK).send();
});

module.exports = {
    getAllByActivityId,
    create,
    remove
}