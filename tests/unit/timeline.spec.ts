import {nextTick} from "vue";
import {mount} from "@vue/test-utils";
import TimeLine from "@/components/TimeLine.vue";
import {today, thisWeek, thisMonth} from '@/mocks'

describe('TimeLine', () => {
  it('renders today post default', () => {
    const wrapper = mount(TimeLine);

    
    expect(wrapper.html()).toContain(today.created.format("Do MMM"));
  })

  // When click requestAnimationFram(() => ...) is called
  it('update when the period Week is clicked', async () => {
    const wrapper = mount(TimeLine);
    
    // wait for the next frame
    // await nextTick();
    await wrapper.get('[data-test="This Week"]').trigger('click')
    expect(wrapper.html()).toContain(today.created.format("Do MMM"));
    expect(wrapper.html()).toContain(thisWeek.created.format("Do MMM"));
  })

  // When click requestAnimationFram(() => ...) is called
  it('update when the period Month is clicked', async () => {
    const wrapper = mount(TimeLine);
    
    // wait for the next frame
    // await nextTick() or just add await before wrpper trigger
    await wrapper.get('[data-test="This Month"]').trigger('click')
    expect(wrapper.html()).toContain(today.created.format("Do MMM"));
    expect(wrapper.html()).toContain(thisWeek.created.format("Do MMM"));
    expect(wrapper.html()).toContain(thisMonth.created.format("Do MMM"));
  })
})